import Nl_helper from '../../../support/helpers/Nl_helper';
import Nl_template_PO from '../../../support/pageObjects/Nl_template_PO';

/// <reference types="Cypress" />

describe('Check tracking parameters for non-product links', () => {
    let data;
    before(function () {

        cy.fixture('nl_urls.json').then((fixture_data) => {
            data = fixture_data;
        })
    })


    /** @type {Nl_helper} */
    const nl_helper = new Nl_helper();

    // /** @type {object} */
    // const nl_url_list = nl_helper.getTestData('nl_urls.json');

    // /** @type {string} */
    // let nl_url = "https://news.shopping.check24.de/u/gm.php?prm=VDLjGz1AeJ_766749435_6267609_1";

    // /** @type {Nl_template_PO} */
    // const nl_template = new Nl_template_PO(nl_url);

    // Ignore errors from the site itself
    Cypress.on('uncaught:exception', () => {
        return false;
    });


    it('C962349 Check if utm_campaign value of all non product links is the same, url: ', () => {

        /* Add your test code here
        //filter out all links which contain utm_campaign
        //check if the links were found
        //check if all paramter values are equal to each other
        */

        data.campaign_urls.forEach((url) => {

            cy.visit(url);
            let result = [];
            let counter = 0;
            let val;

            //Getting the URLS with utm_campaign parameter and pushing them in the array
            cy.get('a').each(($el, index, $list) => {
                if ($el.prop('href').includes("utm_campaign")) {
                    counter++;
                    result.push($el.prop("href"));
                }
            }).then(() => {
                let li = nl_helper.extractParameterValues(result, "utm_campaign");
                for (val of li) {
                    assert.equal(val.parameterValue, "nl_20220401_category", "URL:" + val.link)
                }
            }).then(() => cy.log("Total No of utm_campaign parameters Validated: " + counter))
        })
    });



    it('C955682 Check if wpset value of all non product links is the same, url: ', () => {

        /* Add your test code here
        //filter out all links which contain wpset
        //check if the links were found
        //check if all paramter values are equal to each other
        */

        data.campaign_urls.forEach((url) => {

            cy.visit(url);
            let result = [];
            let counter = 0;

            //Getting the URLS with utm_campaign parameter and pushing them in the array
            cy.get('a').each(($el, index, $list) => {
                if ($el.prop('href').includes("wpset")) {
                    counter++;
                    result.push($el.prop("href"));
                }
            }).then(() => {
                let li = nl_helper.extractParameterValues(result, "wpset");
                for (let val of li) {
                    assert.equal(val.parameterValue, "newsletter_shopping_02", "URL:" + val.link);
                }
            }).then(() => cy.log("Total No of wpset parameters Validated: " + counter))
        })
    })

})

