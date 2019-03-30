# 1.0.0 (2019-03-30)


### Bug Fixes

* **@d3/types:** @d3/types is breaking some components. ([6b7b5b2](https://github.com/edgarordonez/d3-stencil/commit/6b7b5b2))
* **CircleCI:** change docker image ([ac4a3c7](https://github.com/edgarordonez/d3-stencil/commit/ac4a3c7))
* **CircleCi has another user-agent, try to fit it:** CirlceCi user-agent error on run the tests ([442d579](https://github.com/edgarordonez/d3-stencil/commit/442d579))
* **package.json:** Add --coverage flag in the test script ([de302c1](https://github.com/edgarordonez/d3-stencil/commit/de302c1))
* **package.json:** return to older versions of dependencies ([fff9c20](https://github.com/edgarordonez/d3-stencil/commit/fff9c20))


### Code Refactoring

* **components:** removed app component ([a2bc6b2](https://github.com/edgarordonez/d3-stencil/commit/a2bc6b2)), closes [#19](https://github.com/edgarordonez/d3-stencil/issues/19)
* **interfaces:** generic types on all the graph interfaces ([16d1c7a](https://github.com/edgarordonez/d3-stencil/commit/16d1c7a)), closes [#15](https://github.com/edgarordonez/d3-stencil/issues/15)
* **shared:** default data rewritten ([f491f42](https://github.com/edgarordonez/d3-stencil/commit/f491f42)), closes [#15](https://github.com/edgarordonez/d3-stencil/issues/15)
* **src:** breaking circular dependencies ([5ad0436](https://github.com/edgarordonez/d3-stencil/commit/5ad0436))


### Features

* **package.json:** added docusaurus ([4c61643](https://github.com/edgarordonez/d3-stencil/commit/4c61643)), closes [#19](https://github.com/edgarordonez/d3-stencil/issues/19)
* **package.json:** commitlint and husky ([632473a](https://github.com/edgarordonez/d3-stencil/commit/632473a)), closes [#13](https://github.com/edgarordonez/d3-stencil/issues/13)
* **website:** created website for docs under docusaurus.io ([708a7e0](https://github.com/edgarordonez/d3-stencil/commit/708a7e0)), closes [#19](https://github.com/edgarordonez/d3-stencil/issues/19)


### BREAKING CHANGES

* **src:** hasDataMethod to hasData - "method" naming is implicit  and unnecessary
* **components:** app component is not available any more
* **shared:** if you are using TypeScript, add the generic types to override the default value
* **interfaces:** if you are using TypeScript, add the generic types to override the default value



