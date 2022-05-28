'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Grover documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AccountModule-648e37b84b4aeefc854127aaf3be563915ee1ececba02d1d382f91a233b169012978171bb0582c99086411b26e8fb94ee29241afbe961355b6072523b5e012c4"' : 'data-target="#xs-controllers-links-module-AccountModule-648e37b84b4aeefc854127aaf3be563915ee1ececba02d1d382f91a233b169012978171bb0582c99086411b26e8fb94ee29241afbe961355b6072523b5e012c4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AccountModule-648e37b84b4aeefc854127aaf3be563915ee1ececba02d1d382f91a233b169012978171bb0582c99086411b26e8fb94ee29241afbe961355b6072523b5e012c4"' :
                                            'id="xs-controllers-links-module-AccountModule-648e37b84b4aeefc854127aaf3be563915ee1ececba02d1d382f91a233b169012978171bb0582c99086411b26e8fb94ee29241afbe961355b6072523b5e012c4"' }>
                                            <li class="link">
                                                <a href="controllers/AccountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/BalanceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BalanceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AccountModule-648e37b84b4aeefc854127aaf3be563915ee1ececba02d1d382f91a233b169012978171bb0582c99086411b26e8fb94ee29241afbe961355b6072523b5e012c4"' : 'data-target="#xs-injectables-links-module-AccountModule-648e37b84b4aeefc854127aaf3be563915ee1ececba02d1d382f91a233b169012978171bb0582c99086411b26e8fb94ee29241afbe961355b6072523b5e012c4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountModule-648e37b84b4aeefc854127aaf3be563915ee1ececba02d1d382f91a233b169012978171bb0582c99086411b26e8fb94ee29241afbe961355b6072523b5e012c4"' :
                                        'id="xs-injectables-links-module-AccountModule-648e37b84b4aeefc854127aaf3be563915ee1ececba02d1d382f91a233b169012978171bb0582c99086411b26e8fb94ee29241afbe961355b6072523b5e012c4"' }>
                                        <li class="link">
                                            <a href="injectables/AccountRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HttpResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthModule-a659f1297b907f1f0ea0fcef73349014fc354c351c98b0065ce1c6c2311f6c4116623ef94b46aed0f5d3f092f73fbd688236f9901db3cddd9906a081224d9fba"' : 'data-target="#xs-controllers-links-module-HealthModule-a659f1297b907f1f0ea0fcef73349014fc354c351c98b0065ce1c6c2311f6c4116623ef94b46aed0f5d3f092f73fbd688236f9901db3cddd9906a081224d9fba"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-a659f1297b907f1f0ea0fcef73349014fc354c351c98b0065ce1c6c2311f6c4116623ef94b46aed0f5d3f092f73fbd688236f9901db3cddd9906a081224d9fba"' :
                                            'id="xs-controllers-links-module-HealthModule-a659f1297b907f1f0ea0fcef73349014fc354c351c98b0065ce1c6c2311f6c4116623ef94b46aed0f5d3f092f73fbd688236f9901db3cddd9906a081224d9fba"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HttpResponseModule.html" data-type="entity-link" >HttpResponseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HttpResponseModule-a6c9766e4d6230ed2dcf2c247d9c22859948cc621a95122838b48cb6bfb6c5386a4eadef0ba89ce2bd1fcc6bab8ce890979f29b89c1b2bdd30566d5278369214"' : 'data-target="#xs-injectables-links-module-HttpResponseModule-a6c9766e4d6230ed2dcf2c247d9c22859948cc621a95122838b48cb6bfb6c5386a4eadef0ba89ce2bd1fcc6bab8ce890979f29b89c1b2bdd30566d5278369214"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HttpResponseModule-a6c9766e4d6230ed2dcf2c247d9c22859948cc621a95122838b48cb6bfb6c5386a4eadef0ba89ce2bd1fcc6bab8ce890979f29b89c1b2bdd30566d5278369214"' :
                                        'id="xs-injectables-links-module-HttpResponseModule-a6c9766e4d6230ed2dcf2c247d9c22859948cc621a95122838b48cb6bfb6c5386a4eadef0ba89ce2bd1fcc6bab8ce890979f29b89c1b2bdd30566d5278369214"' }>
                                        <li class="link">
                                            <a href="injectables/HttpResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HttpResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoggerModule-e1d8eed0066ba07626c75cc3622120ba012c230aa3f58c86d32841cc093c1fe4a3aac924dfaf3b408de7063b0bc132558ec48f0fc99342ef2e3cd500b80db958"' : 'data-target="#xs-injectables-links-module-LoggerModule-e1d8eed0066ba07626c75cc3622120ba012c230aa3f58c86d32841cc093c1fe4a3aac924dfaf3b408de7063b0bc132558ec48f0fc99342ef2e3cd500b80db958"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-e1d8eed0066ba07626c75cc3622120ba012c230aa3f58c86d32841cc093c1fe4a3aac924dfaf3b408de7063b0bc132558ec48f0fc99342ef2e3cd500b80db958"' :
                                        'id="xs-injectables-links-module-LoggerModule-e1d8eed0066ba07626c75cc3622120ba012c230aa3f58c86d32841cc093c1fe4a3aac924dfaf3b408de7063b0bc132558ec48f0fc99342ef2e3cd500b80db958"' }>
                                        <li class="link">
                                            <a href="injectables/LoggerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/BalanceController.html" data-type="entity-link" >BalanceController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateAccountReposnseDto.html" data-type="entity-link" >CreateAccountReposnseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAccountRequestDTO.html" data-type="entity-link" >CreateAccountRequestDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepositMoneyRequestDTO.html" data-type="entity-link" >DepositMoneyRequestDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvironmentVariables.html" data-type="entity-link" >EnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserAccountRequestDTO.html" data-type="entity-link" >GetUserAccountRequestDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserAccountResponseDTO.html" data-type="entity-link" >GetUserAccountResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpResponseException.html" data-type="entity-link" >HttpResponseException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShowBalanceReponseDTO.html" data-type="entity-link" >ShowBalanceReponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAccountRequestDTO.html" data-type="entity-link" >UpdateAccountRequestDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link" >AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpResponseService.html" data-type="entity-link" >HttpResponseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerInterceptor.html" data-type="entity-link" >LoggerInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccountEntity.html" data-type="entity-link" >AccountEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HttpResponse.html" data-type="entity-link" >HttpResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationPipeOptions.html" data-type="entity-link" >ValidationPipeOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VirtualBankOptions.html" data-type="entity-link" >VirtualBankOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});