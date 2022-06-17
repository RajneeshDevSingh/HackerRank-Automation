
//email id = jenibem402@siberpay.com 
// jenibem402@siberpay.com
//pepcoding123

let puppeteer = require('puppeteer');
const AllCode = require('./AllCode');
//let codeFile = require('./AllCode');

let page; // Globle variable 

let email = 'xikibid862@robhung.com '
let password = 'pepcoding123';
const loginLink = "https://www.hackerrank.com/auth/login";



let browserWillLaunchPromise = puppeteer.launch(
    {
        headless : false ,
        args:['--start - maximized'], // for full size screen ;
        defaultViewport : null        // on full screen ;

    }
   
)

browserWillLaunchPromise.then(
    function(browserInstance)
    {
       
        let  promiseNewTab = browserInstance.newPage() // return new nstance of new tab ;
        

        return promiseNewTab;  
        
    }).then(function(promiseNewTab){
        page = promiseNewTab;
        let newPage = promiseNewTab.goto(loginLink);
        return newPage ;
        
    }).then(function() // no need to paas parameter , parameter is page(globally)
    {
        let emailPromise  = page.type("input[id=input-1]",email,{delay : 50});
        return emailPromise;
        
    }).then(function()
    {
        let passwordPromise = page.type("input[id=input-2]",password,{delay : 100});
        return passwordPromise;
    }).then(function()
    {
        let LoginPromise = page.click('button[data-analytics="LoginPassword"]' , {delay : 50});
        return LoginPromise;
    }).then(function()
    {
        let algoSelectorclickPromise = WaitAndClick('a[data-attr1="algorithms"]' , page);
        return algoSelectorclickPromise;
    }).then(function()
    {

        let WramUpSectionClicked = WaitAndClick('input[value="warmup"]' , page)

        return WramUpSectionClicked;
        
    }).then(function()
    {
        let AllQuestionInWramupArray = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        return AllQuestionInWramupArray;
    }).then(function(TotalQuestionInArray)
    {
        //console.log("Question in array = "+TotalQuestionInArray.length);

        let  questionWillbeSolved = questionSolver(page, TotalQuestionInArray[0], AllCode.answers[0]);
        return questionWillbeSolved;
    })



    function questionSolver(page , question , answer)
    {
        return new Promise(function(resolve , reject)
        {
            let questionWillbeClickedPromise = question.click();

            questionWillbeClickedPromise.then(function()
            {
                let waitForEditor = WaitAndClick('.monaco-editor.no-user-select.vs' , page);
                return waitForEditor;
            }).then(function()
            {
                let CustomInputClicked = WaitAndClick('.checkbox-input' , page);
                return CustomInputClicked;
            }).then(function()
            {
                return WaitAndClick('.input.text-area.custominput.auto-width' , page);
            }).then(function()
            {
                return page.type('.input.text-area.custominput.auto-width' , answer , {dalay : 20 });
            }).then(function () {
                let ctrlIsPressedPromise = page.keyboard.down("Control");
                return ctrlIsPressedPromise;
              }).then(function () {
                let AisPressedPromise = page.keyboard.press("A", { delay: 100 });
                return AisPressedPromise;
              }) .then(function () {
                let XisPressedPromise = page.keyboard.press("X", { delay: 100 });
                return XisPressedPromise;
              }).then(function () {
                let ctrlIsReleasedPromise = page.keyboard.up("Control");
                return ctrlIsReleasedPromise;
              }).then(function () {
                let waitForCodeAreaPromise = WaitAndClick(".monaco-editor.no-user-select.vs",page);
                  
                return waitForCodeAreaPromise;
              }).then(function() // custom input to main editor
              {
                let ctrlIsPressedPromise = page.keyboard.down("Control");
                return ctrlIsPressedPromise;
              }).then(function () {
                let AisPressedPromise = page.keyboard.press("A", { delay: 100 });
                return AisPressedPromise;
              }) .then(function () {
                let VisPressedPromise = page.keyboard.press("V", { delay: 100 });
                return VisPressedPromise;
              }).then(function () {
                let ctrlIsReleasedPromise = page.keyboard.up("Control");
                return ctrlIsReleasedPromise;
              }).then(function(){
                let runButtonClicked = page.click(' .hr-monaco__run-code' , {delay : 50})
                return runButtonClicked
              }).then(function()
              {
                  let FinalSubmit = page.click('.hr-monaco-submit.ui-btn-styled .ui-text' , {delay : 50});
                  return FinalSubmit;
              }).then(function(){
                resolve()
              }).catch(function(err){
                 console.log(err)
              });
        })
    }
        


    function WaitAndClick(selector , CurrentPage)
    {
        return   new Promise(function(resolve , reject)
        {
            let  waitFornewPagePromise = CurrentPage.waitForSelector(selector);


            waitFornewPagePromise.then(function()
            {
                let clickModal = CurrentPage.click(selector , {delay : 75});
                return clickModal;



            }).then(function()
            {
                resolve()
            }).catch(function()
            {
                reject()
            })

        })
    }

    



// console.log("After Work");

