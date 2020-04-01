// Quote Convertor 
// JS Code 26th MArch 2020
// Eddie Saunders saunders.eddie@outlook.com
//
// This script is to accept input from the user then create an API call to convert
// the quote of the day selected by the user to a translation of their choice.

// Potential issues are the face we only have 5 hits per hour using funtranslations.com

// Version 1.00
// Simple input acceptance from user, then use translateOurQuote to display the translation
// EXS 26th MArch 2020

$(document).ready(function () {

    $('.dropdown-trigger').dropdown();

    const baseURL = "https://api.funtranslations.com/translate/"
    const cockneyURL = "cockney.json?text=";
    const pirateURL = "pirate.json?text=";
    const chefURL = "chef.json?text=";
    const oldEnglishURL = "oldenglish.json?text=";
    const southernURL = "southern-accent.json?text=";

    var randomQuote = ""
    var translationsPerHour = 5;

    // T.W. 3/29
    // Function To Count Each Translate
    function translatorCountFunction() {
        if (translationsPerHour === 0) {
            countDown();
            return false;
        }
        else {
            translationsPerHour--;
            $("#translateCounter").text(translationsPerHour);
        }
    };

    // T.W. 3/30
    // Resets Translates To 5 After One Hour
    function countDown() {
        var count = 3600;
        var oneHourCountDown = setInterval(function () {
            console.log("CountDown: " + count);
            $("#translateCounterText").text("Seconds until you can translate again: " + count);
            count--
            if (count === 0) {
                clearInterval(oneHourCountDown);
                $("#translateCounter").text(5);
            }
        }, 1000);
    };

    randomQuote = $('#randomQuote').val();

    $("#getRandomQuote").click(function () {
        $.ajax({
            url: "https://favqs.com/api/qotd"

        }).then(function (response) {
            console.log(response);
            randomQuote = (response.quote.body);
            $('#randomQuote').text(randomQuote);
        });

        // These functions are tied into the menu system. After each translation
        // the code will automatically reduce one from the translation number
        // EXS added in Chef and Old English 30th March 2020.
        $("#pirateTranslation").click(function () {
            var fullPirateURL = baseURL + pirateURL;
            translateOurQuote(randomQuote, fullPirateURL);
            // T.W 3/31
            // Invoking Function To Count This Translation
            translatorCountFunction();
        });

        $("#cockneyTranslation").click(function () {
            var fullCockneyURL = baseURL + cockneyURL
            translateOurQuote(randomQuote, fullCockneyURL);
            // T.W 3/31
            // Invoking Function To Count This Translation
            translatorCountFunction();
        });
        $("#chefTranslation").click(function () {
            var fullChefURL = baseURL + chefURL;
            translateOurQuote(randomQuote, fullChefURL);
            // T.W 3/31
            // Invoking Function To Count This Translation
            translatorCountFunction();
        });
        $("#oldEnglishTranslation").click(function () {
            var fullOldEnglishURL = baseURL + oldEnglishURL;
            translateOurQuote(randomQuote, fullOldEnglishURL);
            // T.W 3/31
            // Invoking Function To Count This Translation
            translatorCountFunction();
        });

        $("#southernTranslation").click(function () {
            var fullSouthernURL = baseURL + southernURL;
            translateOurQuote(randomQuote, fullSouthernURL);
            translatorCountFunction();
        });

        // This function allows us to pass the quote and create an API URL for fun translations
        //  EXS 27th March 2020
        // Adding random comment to test git push
        function translateOurQuote(randomQuote, translateURL) {
            //console.log (randomQuote, translateURL);
            myQuote = encodeURI(randomQuote);
            myURL = translateURL + myQuote;
            $.ajax({
                url: myURL
            }).then(function (response) {
                console.log(response);
                $("#translated").text(response.contents.translated);
                // After translation call the attributeSites function
                // This may need expanding with the type of translation performed
                atrributeSites();
            })
        };

        function atrributeSites() {
            // This function will display the attribute links required for API access
            // EXS msaunders.eddie@outlook.com 28th March 2020
            // convertedType would be the pirate, cockney, yoda etc...
            // EXS requested two fields for these to be written to 30th March
            const funTranslationsAPI = "https://www.funtranslations.com";
            const quoteAPI = "https://favqs.com/api/qotd"
            console.log("attributed sites");
        }

        function soundAndFont() {
            console.log("Sounds and font");
        }
    });
    // End of jquery ready function    
});