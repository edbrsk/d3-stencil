---
id: dev-intro
title: Developing D3-Stencil
---

The intention is to make contributions to this project as easy and as transparent as possible.

## Getting Started

When developing D3-Stencil, follow these steps to setup your environment, format your code, and run linter and tests:

1. Fork [D3-Stencil](https://github.com/edgarordonez/d3-stencil) on GitHub.

2. Clone the git repo.

```bash
$ git clone https://github.com/$USERNAME/d3-stencil
$ cd d3-stencil
```

- Install the dependencies

```bash
$ yarn
```

- Start the project to check it works without any problems.

```bash
$ yarn start
```

## Conventions

- Please, use [commitizen](https://github.com/commitizen/cz-cli). This allows us to follow a structure and generate the CHANGELOG using [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli).

- Follow whenever possible the rules and the styles defined at `.editorconfig`, `.tslint.json`, etc. Would be nice if you have installed Prettier, TSlint/ESlint, and if you are using VSCode, you may find this [extension](https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen) useful.

## Pull Requests

Pull requests are welcome.

1. If you've added code that should be tested, add unit tests.
2. If you've changed APIs, update the documentation.
3. Ensure the test suite passes.
4. Make sure your code lints.

## Issues

We use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

## License

By contributing to D3-Stencil, you agree that your contributions will be licensed under the LICENSE file in the root directory of this source tree.
