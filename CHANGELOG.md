## 2.2.3 (2020-03-27)


### Bug Fixes

* **components:** decorator method changed for watch decorator ([cfce09e](https://github.com/edgarordonez/d3-stencil/commit/cfce09e087cbdefe4b0660dc8f5b59c0a4c229c0)), closes [#117](https://github.com/edgarordonez/d3-stencil/issues/117)
* alignment  [#47](https://github.com/edgarordonez/d3-stencil/issues/47) ([c754fb5](https://github.com/edgarordonez/d3-stencil/commit/c754fb517b58b6f857e015ec915a3c92943864f2))
* **async:** fix [#40](https://github.com/edgarordonez/d3-stencil/issues/40) ([6735510](https://github.com/edgarordonez/d3-stencil/commit/6735510751710a92c3b6d71153041f977fb189fb))
* [#38](https://github.com/edgarordonez/d3-stencil/issues/38) ([313ccfb](https://github.com/edgarordonez/d3-stencil/commit/313ccfb2b3c3ca1c26f3633abbf06a57d1e36312))
* **@d3/types:** @d3/types is breaking some components. ([32eef26](https://github.com/edgarordonez/d3-stencil/commit/32eef26b7720dfde2ab1b732e2feb64b3a665115))
* **CircleCI:** change docker image ([824f295](https://github.com/edgarordonez/d3-stencil/commit/824f295efab884af522a1d92a4d1403a841f55b9))
* **CircleCi has another user-agent, try to fit it:** CirlceCi user-agent error on run the tests ([afbb3e2](https://github.com/edgarordonez/d3-stencil/commit/afbb3e2b282cf0b8d4c52ab5fd17c1196214856d))
* **core:** missing "h" import ([8f5ad59](https://github.com/edgarordonez/d3-stencil/commit/8f5ad597a1aa4326982c8d129a76072177c0608c))
* **husky:** add it again ([2b97a05](https://github.com/edgarordonez/d3-stencil/commit/2b97a05971597a6231754c71ea0700c6513218c6))
* **index:** module and nomodule ([38cd63a](https://github.com/edgarordonez/d3-stencil/commit/38cd63aa53c275fd0727b2401ba08e7253a9948f))
* **package.json:** Add --coverage flag in the test script ([dd87fef](https://github.com/edgarordonez/d3-stencil/commit/dd87fefaa31693e189fe530824cae9d7605a3ca1))
* **package.json:** return to older versions of dependencies ([c14d899](https://github.com/edgarordonez/d3-stencil/commit/c14d899a83f8c76e9c906b429e31c990aa37e145))
* **stencil:** system pushed back to jest 23 and puppeteer 1.14 ([0ca08da](https://github.com/edgarordonez/d3-stencil/commit/0ca08da211fef635d78f54788c67bd3b3a0c44fb))


### Code Refactoring

* **components:** removed app component ([96ee03a](https://github.com/edgarordonez/d3-stencil/commit/96ee03abc47ae41c7e5641ebc3f7ef0b2d7c4a97)), closes [#19](https://github.com/edgarordonez/d3-stencil/issues/19)
* **interfaces:** generic types on all the graph interfaces ([d588b4f](https://github.com/edgarordonez/d3-stencil/commit/d588b4f6817ad555670a9d6e7c8761aca7276377)), closes [#15](https://github.com/edgarordonez/d3-stencil/issues/15)
* **shared:** default data rewritten ([964adaf](https://github.com/edgarordonez/d3-stencil/commit/964adaf4bcdf2c6b9ee9a54f6086caa2d1c53269)), closes [#15](https://github.com/edgarordonez/d3-stencil/issues/15)
* **src:** breaking circular dependencies ([8bfd6af](https://github.com/edgarordonez/d3-stencil/commit/8bfd6afbfbe69bd66871606a0b08f29912ca932c))


### Features

* **core:** @stencil/core 1.0.0  released ([c4a87df](https://github.com/edgarordonez/d3-stencil/commit/c4a87df83dba6ba3baf3c8a1c2b6e37954bf5832))
* **package.json:** added docusaurus ([c128d11](https://github.com/edgarordonez/d3-stencil/commit/c128d1144a12d46529e7c72d31dc39d073c1d009)), closes [#19](https://github.com/edgarordonez/d3-stencil/issues/19)
* **package.json:** commitlint and husky ([57be81d](https://github.com/edgarordonez/d3-stencil/commit/57be81d35031c6f27f55fbd983865a79059a621e)), closes [#13](https://github.com/edgarordonez/d3-stencil/issues/13)
* **upgrade:** wip for stencil one ([5f264d2](https://github.com/edgarordonez/d3-stencil/commit/5f264d2bd4f703f4c6e4503ec87dc15f95e7a8c6))
* **website:** created website for docs under docusaurus.io ([e0b64fd](https://github.com/edgarordonez/d3-stencil/commit/e0b64fda74b97aad57364a1638cfa536d38516b8)), closes [#19](https://github.com/edgarordonez/d3-stencil/issues/19)


### BREAKING CHANGES

* **components:** The updateGraphData method it's not gonna be public anymore, the component will
update changing the graphData prop
* **src:** hasDataMethod to hasData - "method" naming is implicit  and unnecessary
* **components:** app component is not available any more
* **shared:** if you are using TypeScript, add the generic types to override the default value
* **interfaces:** if you are using TypeScript, add the generic types to override the default value



## 2.2.2 (2020-03-27)


### Bug Fixes

* **components:** decorator method changed for watch decorator ([cfce09e](https://github.com/edgarordonez/d3-stencil/commit/cfce09e087cbdefe4b0660dc8f5b59c0a4c229c0)), closes [#117](https://github.com/edgarordonez/d3-stencil/issues/117)
* alignment  [#47](https://github.com/edgarordonez/d3-stencil/issues/47) ([c754fb5](https://github.com/edgarordonez/d3-stencil/commit/c754fb517b58b6f857e015ec915a3c92943864f2))
* **async:** fix [#40](https://github.com/edgarordonez/d3-stencil/issues/40) ([6735510](https://github.com/edgarordonez/d3-stencil/commit/6735510751710a92c3b6d71153041f977fb189fb))
* [#38](https://github.com/edgarordonez/d3-stencil/issues/38) ([313ccfb](https://github.com/edgarordonez/d3-stencil/commit/313ccfb2b3c3ca1c26f3633abbf06a57d1e36312))
* **@d3/types:** @d3/types is breaking some components. ([32eef26](https://github.com/edgarordonez/d3-stencil/commit/32eef26b7720dfde2ab1b732e2feb64b3a665115))
* **CircleCI:** change docker image ([824f295](https://github.com/edgarordonez/d3-stencil/commit/824f295efab884af522a1d92a4d1403a841f55b9))
* **CircleCi has another user-agent, try to fit it:** CirlceCi user-agent error on run the tests ([afbb3e2](https://github.com/edgarordonez/d3-stencil/commit/afbb3e2b282cf0b8d4c52ab5fd17c1196214856d))
* **core:** missing "h" import ([8f5ad59](https://github.com/edgarordonez/d3-stencil/commit/8f5ad597a1aa4326982c8d129a76072177c0608c))
* **husky:** add it again ([2b97a05](https://github.com/edgarordonez/d3-stencil/commit/2b97a05971597a6231754c71ea0700c6513218c6))
* **index:** module and nomodule ([38cd63a](https://github.com/edgarordonez/d3-stencil/commit/38cd63aa53c275fd0727b2401ba08e7253a9948f))
* **package.json:** Add --coverage flag in the test script ([dd87fef](https://github.com/edgarordonez/d3-stencil/commit/dd87fefaa31693e189fe530824cae9d7605a3ca1))
* **package.json:** return to older versions of dependencies ([c14d899](https://github.com/edgarordonez/d3-stencil/commit/c14d899a83f8c76e9c906b429e31c990aa37e145))
* **stencil:** system pushed back to jest 23 and puppeteer 1.14 ([0ca08da](https://github.com/edgarordonez/d3-stencil/commit/0ca08da211fef635d78f54788c67bd3b3a0c44fb))


### Code Refactoring

* **components:** removed app component ([96ee03a](https://github.com/edgarordonez/d3-stencil/commit/96ee03abc47ae41c7e5641ebc3f7ef0b2d7c4a97)), closes [#19](https://github.com/edgarordonez/d3-stencil/issues/19)
* **interfaces:** generic types on all the graph interfaces ([d588b4f](https://github.com/edgarordonez/d3-stencil/commit/d588b4f6817ad555670a9d6e7c8761aca7276377)), closes [#15](https://github.com/edgarordonez/d3-stencil/issues/15)
* **shared:** default data rewritten ([964adaf](https://github.com/edgarordonez/d3-stencil/commit/964adaf4bcdf2c6b9ee9a54f6086caa2d1c53269)), closes [#15](https://github.com/edgarordonez/d3-stencil/issues/15)
* **src:** breaking circular dependencies ([8bfd6af](https://github.com/edgarordonez/d3-stencil/commit/8bfd6afbfbe69bd66871606a0b08f29912ca932c))


### Features

* **core:** @stencil/core 1.0.0  released ([c4a87df](https://github.com/edgarordonez/d3-stencil/commit/c4a87df83dba6ba3baf3c8a1c2b6e37954bf5832))
* **package.json:** added docusaurus ([c128d11](https://github.com/edgarordonez/d3-stencil/commit/c128d1144a12d46529e7c72d31dc39d073c1d009)), closes [#19](https://github.com/edgarordonez/d3-stencil/issues/19)
* **package.json:** commitlint and husky ([57be81d](https://github.com/edgarordonez/d3-stencil/commit/57be81d35031c6f27f55fbd983865a79059a621e)), closes [#13](https://github.com/edgarordonez/d3-stencil/issues/13)
* **upgrade:** wip for stencil one ([5f264d2](https://github.com/edgarordonez/d3-stencil/commit/5f264d2bd4f703f4c6e4503ec87dc15f95e7a8c6))
* **website:** created website for docs under docusaurus.io ([e0b64fd](https://github.com/edgarordonez/d3-stencil/commit/e0b64fda74b97aad57364a1638cfa536d38516b8)), closes [#19](https://github.com/edgarordonez/d3-stencil/issues/19)


### BREAKING CHANGES

* **components:** The updateGraphData method it's not gonna be public anymore, the component will
update changing the graphData prop
* **src:** hasDataMethod to hasData - "method" naming is implicit  and unnecessary
* **components:** app component is not available any more
* **shared:** if you are using TypeScript, add the generic types to override the default value
* **interfaces:** if you are using TypeScript, add the generic types to override the default value



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



