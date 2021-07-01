
<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/dalexanco/reki">
    <img src="doc/app-logo.png" alt="Logo" width="451" height="254">
  </a>
  <h3 align="center">Reki</h3>

  <p align="center">
    A small desktop application for developers to make and share HTTP requests.<br/>
    <br />
    <a href="https://github.com/dalexanco/reki/issues">Report Bug</a>
    ·
    <a href="https://github.com/dalexanco/reki/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Reki Screen Shot][product-screenshot]

The main goal of the application is to easilly create, edit and share these request template. Developers will keep control on every part of these data (request, template and data samples) to share each part as they want (synced cloud or git repository for example).<br/>
It works on mac, linux and windows.


### Built With

* [Electron](https://www.electronjs.org/)
* [VueJS](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Bulma](https://bulma.io/)
* love :)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation / Local start

1. Clone the repo
   ```sh
   git clone https://github.com/dalexanco/reki.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Launch locally
    ```sh
    npm run electron:serve
    ```

<!-- USAGE EXAMPLES -->
## Usage

### Open an `.http` file
You can open a `.http` file using the menu "File" > "Open". <br/>
You will find an example in "[doc/request-example.http](https://github.com/dalexanco/reki/doc/request-example.http)"

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/dalexanco/reki/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Project Link: [https://github.com/dalexanco/reki](https://github.com/dalexanco/reki)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: doc/app-preview.png
[product-logo]: doc/app-logo.png
