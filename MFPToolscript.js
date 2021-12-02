var gender="F";     // Gender of User
var age=45.0;       // Age of user
var retage=60.0;    // Retirement Age of User
var spage=66;       // State Pension Age
var nhh=5.0;        // Number of people in Household
var ee=1500.0;      // Earnings from Employment
var be=500.0;       // Earnings from Benefits
var pe=500.0;       // Earnings from Pension
var tme=2500.0;     // Total Monthly Earnings (ee+be+pe)
var tms=1375;       // Total Monthly Spending
var mort=0;         // Monthly Mortgage Payment
var rent=0;         // Monthly Rent Payment
var ctax=150;       // Monthly Council Tax Payment
var fdhh=200;       // Monthly Food and Household Spend
var gasel=100;      // Monthly Gas and Electricity Spend
var telcom=75;      // Monthly Telecoms and Broadband Spending
var water=50;       // Monthly Water Bill
var insu=50;        // Monthly Household Insurance
var carc=0;         // Monthly Car Costs
var loanint=100;    // Monthly Interest on Loan
var monbal=50;      // Monthly balance (tme-tms)
var other=100;      // Monthly other expenditure
var donations=10.0; // Donations to Charities etc.
var endage=99;      // Age at end of pension
var alloc="";       // String containing asset allocation
var cisa=0.0;       // Cash Isa Savings
var sisa=0.0;       // Stocks and Shares Isa Savings
var cnisa=0.0;      // Cash Non-Isa Savings
var sipp=0.0;       // SIPP Pension Savings
var shares=0.0;     // Shares Savings
var mortgage=0.0;   // Mortgage Balance
var sloans=0.0;     // Student Loan Balance
var loans=0.0;      // Other Loan Balance
var housev=0.0;     // House Valuation
var testval=0.0;    // Used for number conversion function
var mortint=0.0;    // Mortgage Payment Monthly
var loanint=0.0;    // Interest on loans
var cisaint=0.0;     // Interest on Cash Isa
var cnisaint=0.0;    // Interest on Cash Non-Isa
var ssisaint=0.0;    // Interest on Stocks and Shares ISA
var sippint=0.0;     // Interest on SIPP and Pensions
var shareint=0.0;    // Interest on Shares
var cpi=2.0;        // CPI Inflation rate %
var cashreal=-1.0;   // Cash Real Return
var bondreal=2.0;   // Bond Real Return
var sharereal=3.0;  // Share Real Return
var cashabs=1.0;    // Cash Absolute Return
var bondabs=4.0;        // Bond Absolute Return
var shareabs=5.0;        // Share Absolute Return
const defaultinvrate=0.02; // Default Return on Stocks and Shares ISA, SIPP and Shares

// Function to pad number between 0 and 999 to 3 digits with leading 0 or 00
function to3digits(num){
    if (num<10) {
        return "00"+num;
    } else if (num<100) {
        return "0"+num;
    } else return num;
}

// Function to Convert Input number between -9.9m and 9.9m to thousands separated with commas
function toCommas(input){
    var thous=0;
    var mills=0;
    var remainder=0;
    var negflag=false;
    opstring="";
    if (input<0){
        input=-input;
        negflag=true;
    }
    if (input>9999999.9){
        opstring="9,999,999";
    } else if (input>999999.9){
        mills=parseInt(input/1000000);
        remainder=input-mills*1000000;
        thous=parseInt(remainder/1000);
        remainder-=thous*1000;
        opstring=+mills+","+to3digits(thous)+","+to3digits(remainder);
    }
    else if (input>999.9){
        thous=parseInt(input/1000);
        remainder=input-thous*1000;
        opstring=thous+","+to3digits(remainder);
    }
    else {
        opstring=input;
    }
    if (negflag){
        opstring="-"+opstring;
    } else {
        opstring=""+opstring;
    }
    return opstring;
}


// Function to Change the Age on the input form
function changeAge(newVal) {
            age=parseInt(newVal);
            document.getElementById("Agebox").value=age;
            messRet(gender);
            changePctpen(document.getElementById("pctpen").value);
}

//Function to Change the Retirement Age on the input form
function changeRetAge(newVal) {
            retage=parseInt(newVal);
            if (retage<age){
                retage=age;
            }
            document.getElementById("RetAgebox").value=retage;
            messRet(gender);
            changePctpen(document.getElementById("pctpen").value);
}

// Function to Change the Gender on the input form and produce a gender-specific retirement message
function changeGen(selected){
        gender=selected;
        messRet(gender);
}

// Function to determine retirement age based on age and gender
function messRet(gender){
                var retmess="";
                if (age>=62){
                    spage=65;
                } else if (age>=56){
                    spage=66;
                } else if (age>=39){
                    spage=67;
                } else spage=68;
            if (gender=="F") 
            {
                if (age>=66) {
                    spage=60;
                } else if (age>=63){
                    spage=126-age;
                }
            }
            if (retage<=age){
                retmess="In retirement. State Pension Age ";
            } else {
                retmess="Not yet retired. State Pension Age ";
            }
            if (age>spage){
                retmess+="was approximately ";
            }
            else {
                retmess+="is approximately ";
            }
            retmess+=spage;
            document.getElementById("retagereport").innerHTML=retmess;

}

// Function to Change the number in the household based on the input form
function changeNhh(newVal) {
            nhh=parseInt(newVal);
            document.getElementById("Nhhbox").value=nhh;
}

// Function to Change the Employed Earnings based on the input form and recalculate and chart the balances
function changeEe(newVal) {
            if (document.getElementById("inEmp").checked==true){
            ee=parseInt(newVal);
            } else {
            ee=0;
            }
            document.getElementById("Eebox").value=ee;
            calcBal();
}

// Function to Change the Benefits Earnings based on the input form and recalculate and chart the balances
function changeBe(newVal) {
            if (document.getElementById("recBen").checked==true){
            be=parseInt(newVal);
            } else {
            be=0;
            }
            document.getElementById("Bebox").value=be;
            calcBal();
}

// Function to Change the Pension Earnings based on the input form and recalculate and chart the balances
function changePe(newVal) {
            if (document.getElementById("recPen").checked==true){
            pe=parseInt(newVal);
            } else {
            pe=0;    
            }
            document.getElementById("Pebox").value=pe;
            calcBal();
}
// Function to Calculate Required Pension Saving based on Required Pension
function changeReqPen(newVal){
    pctpen=(newVal*100.0/ee);
    document.getElementById("pctpen").value=pctpen.toFixed(0);
    changePctpen(pctpen);
}


// Function to Calculate Required Pension  Saving based on input percentages
function changePctpen(newVal){
        reqpen=(parseInt(newVal)*ee/100).toFixed(0);
        document.getElementById("Reqpenbox").value=reqpen;
        if (age>retage){
            numper=(endage-age+1)*12;
            delaypen=0;
        }
        else {
            numper=(endage-retage+1)*12;
            delaypen=retage-age;
        }
        minfl=Math.pow((1+cpi/100.0),1/12)-1;
        msharer=Math.pow((1+shareabs/100.0),1/12)-1;
        //penamt=reqpen/minfl*(Math.pow((1+minfl),numper)-1);
        penamt=-calcbalpen(msharer,minfl,0,reqpen,8060,sipp,age,retage,spage,endage);
        penamt=penamt.toFixed(0);
        document.getElementById("Penlumpsumbox").value=" £"+toCommas(penamt);
        if (delaypen<=0){
            penlstodsh=penamt;
            penlstodcs=penamt;
        } else {
            penlstodsh=(penamt/(Math.pow((1+sharereal/100.0),delaypen))).toFixed(0);
            penlstodcs=(penamt/(Math.pow((1+cashreal/100.0),delaypen))).toFixed(0);
        }
        document.getElementById("Penlstodcsbox").value=" £"+toCommas(penlstodcs);
        document.getElementById("Penlstodshbox").value=" £"+toCommas(penlstodsh);
       // document.getElementById("Penbalbox").value=" £"+toCommas(calcbalpen(msharer,minfl,0,reqpen,8060,sipp,age,retage,spage,endage));
        document.getElementById("Penmonsavbox").value=" £"+toCommas(calcmonsav(msharer,minfl).toFixed(0));
}
// Function to ReCalculate Pension required based on age
function changeFinage(newVal){
    endage=parseInt(newVal);
    changePctpen(document.getElementById("pctpen").value);
}
//Function to estimate monthly payments due to exactly equate to a SIPP of zero at finage
function calcmonsav(mintr,minfl){
    iter1=calcbalpen(mintr,minfl,0,reqpen,8060,sipp,age,retage,spage,endage);
    iter2=calcbalpen(mintr,minfl,1000,reqpen,8060,sipp,age,retage,spage,endage);
    est1=(1000.0-(iter2/((iter2-iter1)/1000.0)));
 //   iter3=calcbalpen(mintr,minfl,est1,2000,8060,0,age,retage,spage,endage);
//  return (est1-(iter3/((iter3-iter2)/(est1-1000.0))));
return est1;
} 
//Function to calculate the balance given state pension age and amount, current age and monthly amount of saving and any SIPP
function calcbalpen(mintr,minfl,savamt,needamt,spamtpa,sippamt,curage,retage,spage,finage){
    for (i=1;i<=(finage-curage)*12;i++){
        calcage=parseInt(curage+i/12.0);
        spamtpa=spamtpa*(1+minfl);
        if (calcage<retage){
            sippamt=sippamt*(1+mintr)+savamt;
        }
        else if(calcage<spage){
            sippamt=(sippamt-needamt)*(1+mintr)+savamt;
            savamt=0.0;
        }
        else{
            sippamt=(sippamt+spamtpa/12.0-needamt)*(1+mintr);
        }
        savamt=savamt*(1+minfl);
        needamt=needamt*(1+minfl);
    }
    return sippamt.toFixed(0);
}

// Function to Change the Pension Earnings based on the input form as long as Rent box is checked
// and recalculate and chart the balances
function changeRent(newVal) {
        if (document.getElementById("PayRent").checked==true){
            rent=parseInt(newVal);
        } else {
            rent=0;
        }
            document.getElementById("Rtbox").value=rent;
            calcBal();
}

// Function to Change the Pension Earnings based on the input form as long as Mortgage box is checked
// and also checks that the pay mortgage and have mortgage checked boxes agree
//and recalculate and chart the balances
function changeMort(newVal) {
        document.getElementById("haveMortgage").checked=document.getElementById("HaveMort").checked;
        if (document.getElementById("HaveMort").checked==true){
            mort=parseInt(newVal);
        } else {
            mort=0;
            mortgage=0;
        }
            document.getElementById("Mgbox").value=mort;           
            calcBal();
}

// Function to Change the Insurance Payments based on the input form and recalculate and chart the balances
function changeInsu(newVal) {
        if (document.getElementById("PayIns").checked==true){
            insu=parseInt(newVal);
        } else {
            insu=0;
        }
            document.getElementById("Insbox").value=insu;
            calcBal();
}

// Function to Change the Food and Household bills based on the input form and recalculate and chart the balances
function changeFdhh(newVal) {
        if (document.getElementById("PayFHH").checked==true){
            fdhh=parseInt(newVal);
        } else {
            fdhh=0;
        }
            document.getElementById("Fhhbox").value=fdhh;
            calcBal();
}

// Function to Change the Car Costs as long as the Have Car box is checked on the input form
// and recalculate and chart the balances
function changeCarc(newVal) {
        if (document.getElementById("HaveCar").checked==true){
            carc=parseInt(newVal);
        } else {
            carc=0;
        }
            document.getElementById("Carbox").value=carc;
            calcBal();
}

// Function to Change the Council tax based on the input form and recalculate and chart the balances
function changeCtax(newVal) {
        if (document.getElementById("PayCT").checked==true){
            ctax=parseInt(newVal);
        } else {
            ctax=0;
        }
            document.getElementById("Ctbox").value=ctax;
            calcBal();
}

// Function to Change the Gas and Electric payments based on the input form and recalculate and chart the balances
function changeGasel(newVal) {
        if (document.getElementById("PayGE").checked==true){
            gasel=parseInt(newVal);
        } else {
            gasel=0;
        }
            document.getElementById("Gebox").value=gasel;
            calcBal();
}

// Function to Change the Telecoms Costs based on the input form and recalculate and chart the balances
function changeTele(newVal) {
        if (document.getElementById("PayTel").checked==true){
            telcom=parseInt(newVal);
        } else {
            telcom=0;
        }
            document.getElementById("Telbox").value=telcom;
            calcBal();
}

// Function to Change the Water Bill based on the input form and recalculate and chart the balances
function changeWat(newVal) {
        if (document.getElementById("PayWat").checked==true){
            water=parseInt(newVal);
        } else {
            water=0;
        }
            document.getElementById("Watbox").value=water;
            calcBal();
}

// Function to Change the Interest on Loans based on the input form and recalculate and chart the balances
function changeLoani(newVal) {
        if (document.getElementById("PayCC").checked==true){
            loanint=parseInt(newVal);
        } else {
            loanint=0;
        }
            document.getElementById("Loanintbox").value=loanint;
            calcBal();
}

// Function to Change the Donations based on the input form and recalculate and chart the balances
function changeDonations(newVal) {
        if (document.getElementById("PayChar").checked==true){
            donations=parseInt(newVal);
        } else {
            donations=0;
        }
            document.getElementById("Donationsbox").value=donations;
            calcBal();
}

// Function to Change the Other Spend based on the input form and recalculate and chart the balances
function changeOth(newVal) {
        if (document.getElementById("PayOth").checked==true){
            other=parseInt(newVal);
        } else {
            other=0;
        }
            document.getElementById("Othbox").value=other;
            calcBal();
}
// Function to calculate the Cash ISA Interest received based on the interest rate
function calcCisa(){
    cisaint=(APRCisa.value)*cisa/1200;
    document.getElementById("CisaAmt").innerHTML="   +£"+cisaint.toFixed(2);
    calcInt();
}
// Function to Change the Cash ISA amounts based on the input form and recalculate the assets
function changeCisa(newVal){
            if (document.getElementById("haveCisa").checked==true){
                cisas="   "+toCommas(newVal);
                cisa=parseInt(cisas.replace(/,/g,""));
                if (isNaN(cisa)){
                cisa=0;
                }
            } else {
                cisas="";
                cisa=0;
            }
            document.getElementById("Cisabox").value=cisas;
            calcCisa();
            calcAss();
}
// Function to Calculate total interest and display in brackets if negative
function calcInt(){
    totint=cisaint+cnisaint+ssisaint+sippint+shareint-mortint-loanint;
    if (totint<0){
        document.getElementById("TotIntbox").innerHTML="Estimated Total Monthly Interest  ( -£" +-totint.toFixed(2)+")";
    }
    else {
        document.getElementById("TotIntbox").innerHTML="Estimated Total Monthly Interest    £"+totint.toFixed(2);
    }
    document.getElementById("messasst").innerHTML="You should do the following ...";
}

// Function to Calculate interest on Stocks and Shares ISA based on an assumed interest rate
function calcSisa(){
    ssisaint=defaultinvrate*sisa/12;
    document.getElementById("SsisaAmt").innerHTML="   +£"+ssisaint.toFixed(2);
    calcInt();
}

// Function to Change the Stocks and Shares ISA amounts based on the input form and recalculate the assets
function changeSisa(newVal){
            if (document.getElementById("haveSisa").checked==true){
                sisas="   "+toCommas(newVal);
                sisa=parseInt(sisas.replace(/,/g,""));
                if (isNaN(sisa)){
                    sisa=0;
                }
            }
            else {
                sisas="";
                sisa=0;
            }
            document.getElementById("Sisabox").value=sisas;
            calcSisa();
            calcAss();
}
// Function to Calculate Monthly Interest on Cash non-ISA based on interest rate
function calcCnisa(){
    cnisaint=(APRCnisa.value)*cnisa/1200;
    document.getElementById("CnisaAmt").innerHTML="   +£"+cnisaint.toFixed(2);
    calcInt();
}
// Function to Change the Cash non-ISA amounts based on the input form and recalculate the assets
function changeCnisa(newVal){
            if (document.getElementById("haveCnisa").checked==true){
                cnisas="   "+toCommas(newVal);
                cnisa=parseInt(cnisas.replace(/,/g,""));
                if (isNaN(cnisa)){
                    cnisa=0;
                }
            } else {
                cnisas="";
                cnisa=0;
            }
            document.getElementById("Cnisabox").value=cnisas;
            calcCnisa();
            calcAss();
}
// Function to Calculate interest on SIPP and Pensions based on an assumed interest rate
function calcSipp(){
    sippint=defaultinvrate*sipp/12;
    document.getElementById("SippAmt").innerHTML="   +£"+sippint.toFixed(2);
    calcInt();
}
// Function to Change the SIPP (Self-Invested Pension Plan) based on the input form and recalculate the assets
function changeSipp(newVal){
            if (document.getElementById("haveSipp").checked==true){
                sipps="   "+toCommas(newVal);
                sipp=parseInt(sipps.replace(/,/g,""));
                if (isNaN(sipp)){
                    sipp=0;
                }
            } else {
                sipps="";
                sipp=0;
            }
            document.getElementById("Sippbox").value=sipps;
            calcSipp();
            calcAss();
}
// Function to Calculate interest on Shares based on an assumed interest rate
function calcShares(){
    shareint=defaultinvrate*shares/12.0;
    document.getElementById("ShareAmt").innerHTML="   +£"+shareint.toFixed(2);
    calcInt();
}

// Function to Change the Shares amounts based on the input form and recalculate the assets
function changeShares(newVal){
            if (document.getElementById("haveShares").checked==true){
                sharess="   "+toCommas(newVal);
                shares=parseInt(sharess.replace(/,/g,""));
                if (isNaN(shares)){
                    shares=0;
                }
            } else{
                sharess="";
                shares=0;
            }
            document.getElementById("Sharebox").value=sharess;
            calcShares();
            calcAss();
}

// Function to Change the House Valuation amount based on the input form and recalculate the assets
function changeHouse(newVal) {
        if (document.getElementById("haveHouse").checked==true){
            housevs="   "+toCommas(newVal);
            housev=parseInt(housevs.replace(/,/g,""));
            if (isNaN(housev)){
                housev=0;
                }
        } else {
            housevs="";
            housev=0;
        }
            document.getElementById("Housebox").value=housevs;         
            calcAss();
}
// Function to calculate the Mortgage interest payment based on the APR Amount
function calcmort(){
    mortint=(APRMort.value)*mortgage/1200;
    document.getElementById("MortAmt").innerHTML="  -(£"+mortint.toFixed(2)+")";
    calcInt();
}
// Function to Change the Mortgage amounts based on the input form, make it consistent with paying mortgage and recalculate the assets
function changeMortgage(newVal){
            document.getElementById("HaveMort").checked=document.getElementById("haveMortgage").checked;
            mortgages="   "+toCommas(newVal);
            if (document.getElementById("haveMortgage").checked==false){
                mortgages="";
                mortgage=0;
                mort=0;
            }
            else {
            mortgage=parseInt(mortgages.replace(/,/g,""));
            if (isNaN(mortgage)){
                mortgage=0;
                }
            }
            document.getElementById("Mortgagebox").value=mortgages;
            calcmort();
            calcAss();
}

// Function to calculate the Loan Interest Payment based on the APR amount
function calcloan(){
    loanint=(APRLoan.value)*loans/1200;
    document.getElementById("LoanAmt").innerHTML="  -(£"+loanint.toFixed(2)+")";
    calcInt();
}

// Function to Change the Loan amounts based on the input form and recalculate the assets
function changeLoans(newVal){
            if (document.getElementById("haveLoans").checked==false){
                loanss="";
                loans=0;
            } else {
                loanss="   "+toCommas(newVal);
                loans=parseInt(loanss.replace(/,/g,""));
                if (isNaN(loans)){
                loans=0;
                }
            }
            document.getElementById("Loanbox").value=loanss;
            calcloan();
            calcAss();
}
// Function to initialise absolute returns
function initialiseRet(){
    cashabs=cashreal+cpi;
    bondabs=bondreal+cpi;
    shareabs=sharereal+cpi;
    document.getElementById("Cashact").innerHTML=" "+cashabs.toFixed(1)+"% ";
    document.getElementById("Bondact").innerHTML=" "+bondabs.toFixed(1)+"% ";
    document.getElementById("Shareact").innerHTML=" "+shareabs.toFixed(1)+"% ";
    document.getElementById("Spagebox").innerHTML=spage;
    changePctpen(document.getElementById("pctpen").value);
}
// Function to Change CPI value and absolute values of other parameters as a result
function changeCPI(newVal){
    cpi=parseFloat(newVal);
    cashabs=cashreal+cpi;
    bondabs=bondreal+cpi;
    shareabs=sharereal+cpi;
    document.getElementById("Cashact").innerHTML=" "+cashabs.toFixed(1)+"% ";
    document.getElementById("Bondact").innerHTML=" "+bondabs.toFixed(1)+"% ";
    document.getElementById("Shareact").innerHTML=" "+shareabs.toFixed(1)+"% ";
    changePctpen(document.getElementById("pctpen").value);
}
// Function to Change CPI value and absolute values of other parameters as a result
function changeCashRet(newVal){
    cashreal=parseFloat(newVal);
    cashabs=cashreal+cpi;
    document.getElementById("Cashact").innerHTML=" "+cashabs.toFixed(1)+"% ";
    changePctpen(document.getElementById("pctpen").value);
}
function changeBondRet(newVal){
    bondreal=parseFloat(newVal);
    bondabs=bondreal+cpi;
    document.getElementById("Bondact").innerHTML=" "+bondabs.toFixed(1)+"% ";
    changePctpen(document.getElementById("pctpen").value);
}
function changeShareRet(newVal){
    sharereal=parseFloat(newVal);
    shareabs=sharereal+cpi;
    document.getElementById("Shareact").innerHTML=" "+shareabs.toFixed(1)+"% ";
    changePctpen(document.getElementById("pctpen").value);
}
// Function to Change the Student Loan amounts based on the input form and recalculate the assets
function changeSloan(newVal){
            if ((document.getElementById("haveSloans")).checked==false){
                sloanss="";
                sloans=0;
            } else {
                sloanss="   "+toCommas(newVal);
                sloans=parseInt(sloanss.replace(/,/g,""));
                if (isNaN(sloans)){
                sloans=0;
                }
            }
            document.getElementById("Sloanbox").value=sloanss;
            calcAss();
}

// Function to calculate total assets and display on form in Thousands separated by commas format
function calcAss(){
    assets=cisa+sisa+cnisa+sipp+shares+housev-mortgage-sloans-loans;
    document.getElementById("assetbox").innerHTML=toCommas(assets);
}

// Function to Calculate the monthly balance based on the input form and recalculate the assets
function calcBal(){
    
    // Calculate Total Monthly Earnings, Total Monthly Expenditure and Monthly Balance
    tme=ee+be+pe;
    tms=rent+mort+fdhh+insu+carc+ctax+gasel+telcom+water+loanint+donations+other;
    monbal=tme-tms;
    var maxamt=tme;  //used to hold the maximum of monthly expenditure or monthly earnings
    if (tms>maxamt) maxamt=tms; 
    // Display figures in appropriate places on Document
    document.getElementById("Tmebox").innerHTML=toCommas(tme);
    document.getElementById("Tmsbox").innerHTML=toCommas(tms);
    document.getElementById("micbox").innerHTML=toCommas(tme);
    document.getElementById("mexbox").innerHTML=toCommas(tms);
    document.getElementById("Balbox").innerHTML=toCommas(monbal)+".";
    // Display appropriate message dependent on whether expenditure is < or > 90% of income
    if (tms>0.9*tme){
        document.getElementById("Warnbox").innerHTML=" Warning: your expenditure is above 90% of your income.";
        document.getElementById("Warnbox").style.color="Red";
    }
    else{
        document.getElementById("Warnbox").innerHTML=" Well done! Your expenditure is less than 90% of your income, you can save!";
        document.getElementById("Warnbox").style.color="Green";
    } 
    // Initialise Canvas as 2D
    var cv=document.getElementById("finCanvas");
    var cv2=cv.getContext("2d");
    // Blank out bar charts with rectangles of background colour
    cv2.fillStyle="#f6e9d8";
    cv2.fillRect(10,0,50,300);
    cv2.fillRect(80,0,50,300);
    cv2.fillRect(150,0,50,300);
    // Draw appropriately scaled Green bar for Earnings  
    cv2.fillStyle="#00FF00";
    cv2.fillRect(10,(120-5000*(tme/maxamt)/50),50,(5000*(tme/maxamt)/50));
    // Draw appropriately scaled Red bar for Spending
    cv2.fillStyle="#FF0000";
    cv2.fillRect(80,(120-5000*(tms/maxamt)/50),50,(5000*(tms/maxamt)/50));
    // Draw a Blue or Orange bar appropriately scaled based on whether balance is positive or negative
    if (monbal>0){
    cv2.fillStyle="#0000FF";
    }
    else {
    cv2.fillStyle="Orange";  
    }
    cv2.fillRect(150,(120-5000*(monbal/maxamt)/50),50,(5000*(monbal/maxamt)/50));
    // Draw Vertical and Horizontal Axes
    cv2.strokeStyle="#AAAAAA";
    cv2.moveTo(9,20);
    cv2.lineTo(9,120);
    cv2.lineTo(220,120);
    cv2.stroke();
    // Label Horizontal Axis with Income Expenditure and Balance
    cv2.font="12px Arial";
    cv2.fillStyle="#888888";
    cv2.fillText("Income            Expenditure   Balance",5,225);
    // Fill in Rectangle in Background Colour
    cv2.fillStyle="f6e9d8";
    cv2.fillRect(10,195,220,20);
    // Print out amounts on chart under Horizontal Axes Labels
    cv2.fillStyle="Black";
    cv2.font="12px Arial"
    cv2.fillText('\u00A3'+toCommas(tme),10,240);
    cv2.fillText('\u00A3'+toCommas(tms),85,240);  
    cv2.fillText('\u00A3'+toCommas(monbal),155,240);
}

// Function to print out allocation based on risk selection by user on form 
function riskalloc(newVal){
    switch (parseInt(newVal)){
        case 0:
            alloc="";
            break;
        case 1:
            alloc=" 100% Cash - Note you still are at risk from inflation";
            break;
        case 2:
            alloc=" 57% Cash, 25% Equities, 10% Gold, 5% Corp. Bonds, 3% Govt. Bonds";
            break;
        case 3:
            alloc=" 23% Cash, 50% Equities, 10% Gold, 10% Corp. Bonds, 7% Govt. Bonds";
            break; 
        case 4:
            alloc=" 65% Equities, 10% Gold, 15% Corp. Bonds, 10% Govt. Bonds";
            break;
        case 5:
            alloc=" 75% Equities, 10% Gold, 9% Corp. Bonds, 6% Govt. Bonds";
            break;
        case 6:
            alloc=" 90% Equities, 10% Gold";
            break;
    }
    document.getElementById("allocbox").innerHTML=alloc;
}
