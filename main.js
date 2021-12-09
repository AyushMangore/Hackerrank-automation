// Author -> Ayush Mangore
// In this project I have automated the hackerrank code submission process
// For this I used puppeteer module of node
// This code will automaticaaly open hackkerank login website and will put email and password
// provided before then it will select the algorithm section and then will select one problem
// and I have stored the solutions of the questions in another file code.js
// from there is will copy the code and paste it into the hackerrank code editor and finally submit it

// First we will require the module
// and also we will store the main login page link of the hackerrank in a constant variable
// we will also store email and password that will be used for login process authentication
const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const codeObject = require('./codes');
const email = "ayushmangore9424653465@gmail.com";
const password = "Ayush@123";



// This code can be designed using two varieties 
// One through asyncc and await
//  -> An async function is a function declared with the async keyword, 
// and the await keyword is permitted within them. The async and await 
// keywords enable asynchronous, promise-based behavior to be written in a 
// cleaner style, avoiding the need to explicitly configure promise chains
// One through promises
// A promise is an object that may produce a single value some time in the future 
// : either a resolved value, or a reason that it's not resolved (e.g., a network error occurred).
//  A promise may be in one of 3 possible states: fulfilled, rejected, or pending

// as we have made our function asynchronous we have to add the prefix async before our function
(async function(){
    // we have kept all this code in a try catch block to ensure the smooth functioning 
    try {
        // Very first step is to open our chromium browser
        // For this we function called launch in puppeteer
        // We can pass arguments in the form of a object
        let browserOpenInstance = await puppeteer.launch({
            headless : false,
            // will start with full screen mode
            args : ["--start-maximized"],
            defaultViewport : null
        })

        // newPage() function will open the new page as this may take time therefore we will await for this operation to be completed
        let newTab = await browserOpenInstance.newPage();
        // we will save the instance of our new tab in a variable
        // after taking the instance we will open our link
        // for this we have goto function in which we will provide the link
        // for this event also we have to await
        await newTab.goto(loginLink);
        // Now when our page is open we have to input email id and password
        // for that we first need to select those html elements
        //  below are the html tags for input of email and password
        // now we will type our email and password in those fields
        // we have type function for that 
        // in first argument we will provide the HTML tag
        // in second argument we will provide the string
        // and in the third argumnet we will provide the delay in the form of object
        // we will encapsulate this event in await
        await newTab.type("input[id='input-1']",email,{delay : 50});
        await newTab.type("input[type='password']",password,{delay : 50});
        // After completion of two events that of typing email and password
        // we have to click the login button
        // we have click function for that 
        // In first argument we will provide the html tag of the button
        // In second argument we will provide the delay in the form of an object 
        await newTab.click("button[data-analytics='LoginPassword']",{delay :50 });
        // Finally we will be logged in to our hackerrank home page
        // Now we have to select the algorithm category
        // It might take delay to process the click therefore we will handle it in different function
        await waitAndClick('.track-card [data-automation="algorithms"]',newTab);
        // After algorithms section has been cicked now we will select the warm up section
        // we have to go through the same process as we did while cicking on algorithms section
        await waitAndClick('input[value="warmup"]',newTab);
        // Now finaally all quesions list will appear
        // we will fetch the list with help of it's html element
        // and we will print the it's denoting basically denoting the nu,ber of questions
        let allChallenges = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50});
        console.log(allChallenges.length);
        // now we have both questions as well as their solutions we will simply iterate through questions 
        // and submit their solutions
        let questionWillBeSolved = await questionSolver(newTab,allChallenges[0],codeObject.answers[0]);

    } catch (error) {
        console.log(error);
    }
})()


// same code is written using promises as well
// let page

// browserOpen.then(function(browserObject){
//     let browserOpenPromise = browserObject.newPage();
//     return browserOpenPromise;
// }).then(function(newtab){
//     page = newtab;
//     let hackerrankOpenPromise = newtab.goto(loginLink);
//     return hackerrankOpenPromise;
// }).then(function(){
//     let emailIsEntered = page.type("input[id='input-1']",email,{delay : 50});
//     return emailIsEntered;
// }).then(function(){
//     let passwordIsEntered = page.type("input[type='password']",password,{delay : 50});
//     return passwordIsEntered;
// }).then(function(){
//     let loginButtonPressed = page.click("button[data-analytics='LoginPassword']",{delay :50 });
//     return loginButtonPressed;
// }).then(function(){
//     let clickOnAlgoPromise = waitAndClick('.track-card [data-automation="algorithms"]',page);
//     return clickOnAlgoPromise;
// }).then(function(){
//     let getToWarmUp = waitAndClick('input[value="warmup"]',page);
//     return getToWarmUp;
// }).then(function(){
//     let waitForSomeTime = page.waitFor(3000);
//     return waitForSomeTime;
// }).then(function(){
//     let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50});
//     return allChallengesPromise;
// }).then(function(questionArr){
//     console.log(questionArr.length);
//     let questionWillBeSolved = questionSolver(page,questionArr[0],codeObject.answers[0]);
    // return questionWillBeSolved;
// })




 async function waitAndClick(selector,cPage){
    //  selector is our html element
    //  cPage is the instance of our tab
    // we will wait for our selector to respond
    // we will await for this event
    await cPage.waitForSelector(selector);
    // and when it is available we will click it
    let selectorClicked = cPage.click(selector);
    // finally we will return the click instance of the selector
    return selectorClicked;



    // written using promises as well
    // return new Promise(function(resolve,reject){
    //     let waitForModePromise = cPage.waitForSelector(selector);
    //     waitForModePromise.then(function(){
    //         let clickModel = cPage.click(selector);
    //         return clickModel;
    //     }).then(function(){
    //         resolve();
    //     }).catch(function(err){
    //         reject();
    //     })
    // })
}

async function questionSolver(page,question,answer){
    // we have three things 

    // instance of our tab
    // the question and the solution
    // At first we have to click the question
    // we will await for this event
    await question.click();
    // Now we have to click custom input selector
    // Because we can't write directly into the editor as it contains the autocomplete feature
    // we will await for this event
    await waitAndClick('.monaco-editor.no-user-select .vs',page);
    await waitAndClick('.checkbox-input',page);
    await waitAndClick('.custom-input',page);
    // after selecting the custom input fiesld we will type our answer
    // we will use the same format for typing by selecting html tag
    await page.type('.custom-input',answer,{delay:10})
    //  Now we have to copy the content of custom input box and paste it to main editor
    // for selecting all the text we need to press ctrl A 
    // and then ctrl X
    // for this we have keyboard functions like down, press, up
    // we will keep ctrl key down 
    // and simultaneously press A
    // and then X
    // and finaaly un press ctrl key
    // In this way our content will be selected
    await page.keyboard.down('Control');
    await page.keyboard.press('A',{delay:100});
    await page.keyboard.press('X',{delay:100});
    await page.keyboard.up('Control');
    // Now we will select our editor area
    await waitAndClick('.monaco-editor.no-user-select .vs',page);
    // after selecting as we have copied in the similar fasion we will paste all the code in the editor
    await page.keyboard.down('Control');
    await page.keyboard.press('A',{delay:100});
    await page.keyboard.press('V',{delay:100});
    await page.keyboard.up('Control');
    // Finally we will click on run code button
    await page.click('.hr-monaco__run-code',{delay : 50});
    
// Same code is written with the help of promises

//     return new Promise(function(resolve,reject){
//         let questionWillBeClicked = question.click();
//         // return questionWillBeClicked;
//         questionWillBeClicked.then(function(){
//             let editorInFocusPromise = waitAndClick('.monaco-editor.no-user-select .vs',page);
//             return editorInFocusPromise;
//         }).then(function(){
//             return waitAndClick('.checkbox-input',page); 
//         }).then(function(){
//             return waitAndClick('.custom-input',page);
//         }).then(function(){
//             return page.type('.custom-input',answer,{delay:10});
//         }).then(function(){
//             let ctrlIsPressed = page.keyboard.down('Control');
//             return ctrlIsPressed;
//         }).then(function(){
//             let AIsPressed = page.keyboard.press('A',{delay:100});
//             return AIsPressed;
//         }).then(function(){
//             let XIsPressed = page.keyboard.press('X',{delay:100});
//             return XIsPressed;
//         }).then(function(){
//             let ctrlIsUnpressed = page.keyboard.up('Control');
//             return ctrlIsUnpressed;
//         }).then(function(){
//             let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select .vs',page);
//             return mainEditorInFocus;
//         }).then(function(){
//             let ctrlIsPressed = page.keyboard.down('Control');
//             return ctrlIsPressed;
//         }).then(function(){
//             let AIsPressed = page.keyboard.press('A',{delay:100});
//             return AIsPressed;
//         }).then(function(){
//             let VIsPressed = page.keyboard.press('V',{delay:100});
//             return VIsPressed;
//         }).then(function(){
//             let ctrlIsUnpressed = page.keyboard.up('Control');
//             return ctrlIsUnpressed;
//         }).then(function(){
//             return page.click('.hr-monaco__run-code',{delay : 50});
//         }).then(function(){
//             resolve();
//         }).catch(function(error){
//             reject();
//         })
//     })
}