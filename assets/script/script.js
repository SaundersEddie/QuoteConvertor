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

    // part of materialize to make dropdown work 
    $('.dropdown-trigger').dropdown();

    //code from materialze to make modal trigger work 
    $('.modal').modal();

    const baseURL = 'https://api.funtranslations.com/translate/'
    const cockneyURL = 'cockney.json?text=';
    const pirateURL = 'pirate.json?text=';
    const chefURL = 'chef.json?text=';
    const oldEnglishURL = 'oldenglish.json?text=';
    const southernURL = 'southern-accent.json?text=';
    const gameStart = new Audio('./assets/sfx/gameStart.mp3');

    var randomQuote = ''
    var translationsPerHour = 5;
    var spaceBtwQuotes = $('<li>');

    //L.C 4/1
    //get user translations from local storage
    var userTranslationsSavedArray = localStorage.getItem('userTranslations');

    //keep from erroring if no translations saved in local storage
    if (!userTranslationsSavedArray) {
        userTranslationsSavedArray = [];
    } else {
        userTranslationsSavedArray = JSON.parse(userTranslationsSavedArray);
    }

    //Add users quotes/translations into the modal and mobile div 
    for (i = 0; i < userTranslationsSavedArray.length; i++) {
        var spaceBtwQuotes = $('<li>');
        $('#translationsMobile').append(userTranslationsSavedArray[i]);
        $('#translationsMobile').append(spaceBtwQuotes);
        $('#translationsMobile').append(spaceBtwQuotes);
    }

    for (i = 0; i < userTranslationsSavedArray.length; i++) {
        var spaceBtwQuotes = $("<li>");
        $('#modalText').append(userTranslationsSavedArray[i]);
        $('#modalText').append(spaceBtwQuotes);
        $('#modalText').append(spaceBtwQuotes);
    }

    //L.C 4/1
    //error message for too many API requests, timer set for 1 hour
    function whoops() {
        $('#translated').val(' ');
        $('#badRequestPopup').show();
        clearStyles();
        setTimeout(function () { $('#badRequestPopup').hide(); }, 3600000);
    }

    //L.C. 4/2
    //function to remove special fonts from translator area 
    function clearStyles() {
        $('#translated').removeClass();
    }

    //L.C. 4/2
    //Click button function to clear local storage 
    $('#clearQuotesBtn').click(function () {
        localStorage.clear();
    })

    // EXS 1st April 2020 - Page initalize
    initPage();

    // T.W. 3/29
    // Function To Count Each Translate
    function translatorCountFunction() {
        if (translationsPerHour === 0) {
            countDown();
            return false;
        }
        else {
            translationsPerHour--;
            $('#translateCounter').text(translationsPerHour);
        }
    };

    // T.W. 3/30
    // Resets Translates To 5 After One Hour
    function countDown() {
        var counter = 3600;
        var oneHourCountDown = setInterval(function () {
            // console.log("CountDown: " + counter);
            counter--
            if (counter === 0) {
                clearInterval(oneHourCountDown);
                $('#translateCounter').text(5);
            }
        }, 1000);
    };

    $('#getRandomQuote').click(function () {
        $.ajax({
            url: 'https://favqs.com/api/qotd',
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            console.log(randomQuote);
            randomQuote = (response.quote.body);
            $('#randomQuote').text(randomQuote);
        });
    });

    // These functions are tied into the menu system. After each translation
    // the code will automatically reduce one from the translation number
    // EXS added in Chef and Old English 30th March 2020.
    $('#pirateTranslation').click(function () {
        var fullPirateURL = baseURL + pirateURL;
        randomQuote = $('#randomQuote').val();
        translateOurQuote(randomQuote, fullPirateURL, 'pirateFont');
        translatorCountFunction();
    });

    $('#cockneyTranslation').click(function () {
        var fullCockneyURL = baseURL + cockneyURL
        randomQuote = $('#randomQuote').val();
        translateOurQuote(randomQuote, fullCockneyURL, 'cockneyFont');
        translatorCountFunction();
    });

    $('#chefTranslation').click(function () {
        var fullChefURL = baseURL + chefURL;
        randomQuote = $('#randomQuote').val();
        translateOurQuote(randomQuote, fullChefURL, 'chefFont');
        translatorCountFunction();
    });

    $('#oldEnglishTranslation').click(function () {
        var fullOldEnglishURL = baseURL + oldEnglishURL;
        randomQuote = $('#randomQuote').val();
        translateOurQuote(randomQuote, fullOldEnglishURL, 'oldEngFont');
        translatorCountFunction();
    });

    $('#southernTranslation').click(function () {
        var fullSouthernURL = baseURL + southernURL;
        randomQuote = $('#randomQuote').val();
        translateOurQuote(randomQuote, fullSouthernURL, 'cowboyFont');
        translatorCountFunction();
    });
    // EXS Empty randomQuote area if user clicks on it
    $('#randomQuote').click(function () {
        $('#randomQuote').empty();
    });

    // This function allows us to pass the quote and create an API URL for fun translations
    //  EXS 27th March 2020
    function translateOurQuote(randomQuote, translateURL, fontType) {
        // Clear any existing CSS font styles.
        clearStyles();
        // Add our new CSS font style class.
        $('#translated').addClass(fontType);
        myQuote = encodeURI(randomQuote);
        myURL = translateURL + myQuote;
        $.ajax({
            url: myURL,
            method: 'GET',
            error: whoops
        }).then(function (response) {
            console.log(response);
            var translation = response.contents.translated
            var spaceBtwQuotes2 = $('<li>');
            $('#translated').text(translation);
            $('#modalText').append(translation);
            $('#modalText').append(spaceBtwQuotes2);
            $('#translationsMobile').append(translation);
            $('#translationsMobile').append(spaceBtwQuotes2);
            userTranslationsSavedArray.push(translation)
            localStorage.setItem('userTranslations', JSON.stringify(userTranslationsSavedArray));
            translatePerformed = true;
        });
    }
    atrributedSites()

    function initPage() {
        atrributedSites();
    }

    function atrributedSites() {
        // This function will display the attribute links required for API access
        var funTranslationsAPI = '<a href="http://funtranslations.com" target="_blank">fun translations</a>';
        var quoteAPI = '<a href="https://favqs.com/" target="_blank" >fave quotes</a>';
        attributeSites = 'Quotes supplied by ' + quoteAPI + '. Translation supplied by ' + funTranslationsAPI;
        $('#attribute-site').html(attributeSites);
    }

    function playSFX(sfxName) {
        console.log('Playing sound effects!');
        sfxName.play();
    }
    // End of jquery ready function    
});
