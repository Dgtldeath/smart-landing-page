/** External file built by PHP */
let h1 = [
    {"ID": 1, "Value": "Stay a Step Ahead of Your Industry"},
    {"ID": 2, "Value": "Don't Deal With Industry Issues Alone. We Can Help"},
    {"ID": 3, "Value": "Fight Compensation With State Patrols"},
];

let cta = [
    {"ID": 4, "Value": "Learn More"},
    {"ID": 5, "Value": "Learn How"},
    {"ID": 6, "Value": "Discover More"},
    {"ID": 7, "Value": "Discover How"},
    {"ID": 8, "Value": "See How We Can Help"},
    {"ID": 9, "Value": "Learn How We Can Help"},
];
/** End External File **/

var contentIsSet = false;

document.addEventListener("DOMContentLoaded", function () {
    let clientURL = window.location.host;

    function updateContentBasedOnSmarterMetrics() {
        fetch('https://{{ your-domain-here.com }}/smartLP/handler.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                action: 'updateContentBasedOnSmarterMetrics',
                clientURL: clientURL
            })
        })
        .then(response => response.json())
        .then(json => {
            h1.forEach(item => {
                if (item.ID == json.h1id) {
                    document.querySelectorAll('.smart-lp-h1').forEach(el => {
                        el.innerHTML = item.Value;
                        el.setAttribute('data-index', json.h1id);
                    });
                }
            });

            cta.forEach(item => {
                if (item.ID == json.ctaid) {
                    document.querySelectorAll('.smart-lp-cta').forEach(el => {
                        el.innerHTML = item.Value;
                        el.setAttribute('data-index', json.ctaid);
                    });
                }
            });

            contentIsSet = true;
        })
        .catch(() => {
            contentIsSet = false;
            defaultContentSet();
        });
    }

    function randomPropertyKey(array) {
        return Math.floor(Math.random() * array.length);
    }

    let randomH1Index = randomPropertyKey(h1);
    let randomCTAIndex = randomPropertyKey(cta);

    function defaultContentSet() {
        contentIsSet = true;
        console.log('Ajax call failed. Setting content by default.');

        document.querySelectorAll('.smart-lp-h1').forEach(el => {
            el.innerHTML = h1[randomH1Index].Value;
            el.setAttribute('data-index', h1[randomH1Index].ID);
        });

        document.querySelectorAll('.smart-lp-cta').forEach(el => {
            el.innerHTML = cta[randomCTAIndex].Value;
            el.setAttribute('data-index', cta[randomCTAIndex].ID);
        });
    }

    setTimeout(() => {
        if (!contentIsSet) {
            defaultContentSet();
        }
    }, 2000);

    updateContentBasedOnSmarterMetrics();

    document.querySelectorAll('.smart-lp-cta').forEach(ctaElement => {
        ctaElement.addEventListener('click', function (e) {
            let url = this.getAttribute('href');
            let winningH1Index = document.querySelector('.smart-lp-h1').getAttribute('data-index');
            let winningCtaIndex = this.getAttribute('data-index');

            console.log('winning h1:', winningH1Index);
            console.log('winning cta:', winningCtaIndex);
            console.log('redirect:', url);

            logResultsWithRedirectURL({ h1: winningH1Index, cta: winningCtaIndex }, url);
        });
    });

    function logResultsWithRedirectURL(indexes, url) {
        fetch('https://{{ your-domain-here.com }}/smartLP/handler.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                action: 'smart-lp-log-results',
                indexes: JSON.stringify(indexes)
            })
        }).then(() => {
            console.log('Logging CTA complete. Redirecting to URL:', url);
        });
    }
});
