const getTemplate = ({ title, url = false }) => {
  const titleText = title ?? 'Domain checker API REG.RU';

  return `
    <form action="POST" data-dc="form" class="domain-checker__form">
    <fieldset class="domain-checker__fiedlset">
      <legend class="domain-checker__legend">${titleText}</legend>
      <p class="domain-checker__row">
        <label class="domain-checker__label">Domain list</label>
        <textarea
          data-dc="form-control"
          class="domain-checker__form-control--textarea domain-checker__form-control"
          name="domains"
          placeholder="Enter domains"
        ></textarea>
      </p>
      
      ${!url
      ? `
        <p class="domain-checker__row">
          <label class="domain-checker__label">Username</label>
          <input
            data-dc="form-control"
            class="domain-checker__form-control"
            type="text"
            name="username"
            placeholder="Enter username"
          />
        </p>

        <p class="domain-checker__row">
          <label class="domain-checker__label">Password</label>
          <input
            data-dc="form-control"
            class="domain-checker__form-control"
            type="password"
            name="password"
            placeholder="Password"
          />
        </p>
        `
      : ''
    }
      
      <button data-dc="btn-submit" class="domain-checker__btn" disabled>Submit</button>
    </fieldset>
  </form>
  <p data-dc="result" class="domain-checker__result"></p>
  `;
};

const getPostData = (params) => {
  const postData = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) postData.push(key + '=' + params[key]);
  }

  return postData.join('&');
};

export default class DomainChecker {
  /**
   *
   * @param {*} selector Selector string or DOM element
   * @param {Object} options Object with settings
   * @param {String} options.url URL to request to the backend server
   * @param {String} options.title Text in legend tag
   */
  constructor(selector, options) {
    this.$el =
      typeof selector == 'string' ? document.querySelector(selector) : selector;

    this.options = options;
    this.#render();
    this.#setup();
  }

  #render() {
    this.$el.classList.add('domain-checker');
    this.$el.innerHTML = getTemplate(this.options);
  }

  #setup() {
    this.$form = this.$el.querySelector('[data-dc="form"]');
    this.$form.addEventListener('submit', this.submitHandler);

    this.$resultOutput = this.$el.querySelector('[data-dc="result"]');
    this.$button = this.$form.querySelector('[data-dc="btn-submit"');

    this.$formControls = this.$form.querySelectorAll(
      '[data-dc="form-control"]'
    );

    this.$formControls.forEach((control) => {
      control.addEventListener('blur', this.blurHandler);
    });
  }

  get loginDetails() {
    const { url } = this.options;
    if (!url) {
      return {
        username: this.$form.username.value,
        password: this.$form.password.value,
      };
    } else {
      return {};
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.postRequest();
  };

  /**
   * Checking the fill of form controls
   */
  blurHandler = () => {
    const isFilled =
      this.$formControls.length > 1
        ? this.$form.domains.value &&
        this.$form.username.value &&
        this.$form.password.value
        : Bool(this.$form.domains.value);

    if (isFilled) this.$button.removeAttribute('disabled');
    else this.$button.setAttribute('disabled', '');
  };

  display({ result, error_text, answer }) {
    if (result === 'error') {
      this.$resultOutput.textContent = error_text;
      return false;
    }

    const strings = answer.domains.map((domain) => {
      if (domain.result === 'error') {
        return `<b>${domain.dname}</b> - ${domain.error_text};<br/>`;
      }

      if (domain.price) {
        return `<b>${domain.dname}</b> - ${domain.result} (Стоимость в ${domain.currency
          } - ${domain.price}, ${domain.is_premium ? 'премиум' : ''});<br/>`;
      }

      return `<b>${domain.dname}</b> - ${domain.result};<br/>`;
    });

    this.$resultOutput.innerHTML = strings.join('');
  }

  postRequest() {
    const xhr = new XMLHttpRequest();
    const { url } = this.options;

    //From string to objects
    const domainList = this.$form.domains.value
      .replace(/\s/g, '')
      .split(';')
      .map((item) => ({ dname: item }));

    const params = {
      input_format: 'json',
      output_format: 'json',
      io_encoding: 'utf8',
      input_data: JSON.stringify({
        domains: [...domainList],
        ...this.loginDetails,
      }),
      show_input_params: 0,
      ...this.loginDetails,
    };

    xhr.open("POST", url ?? 'https://api.reg.ru/api/regru2/domain/check');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {

        this.display(JSON.parse(xhr.responseText));
      }
    };

    xhr.send(getPostData(params));
  }

  destroy() {
    this.$form.removeEventListener('submit', this.submitHandler);
    this.$formControls.forEach((control) => {
      control.removeEventListener('blur', this.blurHandler);
    });
  }
}
