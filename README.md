# react-native-isw-mobile-sdk

This library aids in processing payment through the following channels
- [x] Card
- [x] Verve Wallet
- [x] QR Code
- [X] USSD


## Getting started

There are three steps you would have to complete to set up the SDK and perform transaction
 - Install the SDK as a dependency
 - Configure the SDK with Merchant Information
 - Initiate payment with customer details


### Installation

`$ npm install react-native-isw-mobile-sdk --save`

### Mostly automatic installation

`$ react-native link react-native-isw-mobile-sdk`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-isw-mobile-sdk` and add `IswMobileSdk.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libIswMobileSdk.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.interswitchng.IswMobileSdkPackage;` to the imports at the top of the file
  - Add `new IswMobileSdkPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-isw-mobile-sdk'
  	project(':react-native-isw-mobile-sdk').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-isw-mobile-sdk/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-isw-mobile-sdk')
  	```



### Configuration
You would also need to configure the project with your merchant credentials.

```javascript
import IswMobileSdk, { IswPaymentInfo, Environment, IswSdkConfig } from 'react-native-isw-mobile-sdk';


// get your credentials
const merchantId = "your-merchant-id",
 merchantCode = "your-merchant-code",
 merchantSecret = "your-merchant-seceret",
 currencyCode = "currency-code"; // e.g. 566

// create configuration for payment
// using the credentials
const config = new IswSdkConfig(
    merchantId, 
    merchantSecret,
    merchantCode,
    currencyCode
)


/**
 *  callback function for initialized sdk
 *  @param isSuccessful boolean flag indicating the result of initializing sdk
 */

const onSdkInitialized = (isSuccessful) => {
    // handle result
}

// initialize the sdk at the start of application
// you can point to a specific environment -> TEST || PRODUCTION
const env = Environment.TEST;
IswMobileSdk.initialize(config, env, onSdkInitialized);

```

Once the SDK has been initialized, you can then perform transactions.



#### Performing Transactions
You can perform a transaction, once the SDK is configured, by providing the payment info and payment callbacks, like so:


```javascript

let triggerPayment = (amount) => {
    // amount expressed in lowest
    // denomination (e.g. kobo): "N500.00" -> 50000
    amount = amount * 100

    
    const customerId = "<customer-id>",
        customerName = "<customer-name>",
        customerEmail = "<customer.email@domain.com>",
        customerMobile = "<customer-phone>",
        // generate a unique random
        // reference for each transaction
        reference = "<your-unique-ref>";;


    // create payment information object
    const paymentInfo = new IswPaymentInfo(
        customerId,
        customerName,
        customerEmail,
        customerMobile,
        reference,
        amount,
    )

    // trigger payment with the payment information
    IswMobileSdk.pay(paymentInfo, userDidComplete, userDidCancel);
}

```


#### Handling Result
To handle result all you need to do is process the result in the callback methods: whenever the user cancels, `userDidCancel` is called, and when the transaction is complete, `userDidComplete` is called with the result: an object like below is passed to the callback function.

| Field                 | Type          | meaning  |   
|-----------------------|---------------|----------|
| responseCode          | String        | txn response code  |
| responseDescription   | String        | txn response code description |
| isSuccessful          | boolean       | flag indicates if txn is successful  |
| transactionReference  | String        | reference for txn  |
| amount                | Number           | txn amount  |
| channel               | String| channel used to make payment: one of `CARD`, `WALLET`, `QR`, `USSD`  |


```javascript

let userDidComplete = (result) => {
    // process result
}

let userDidCancel = () => {
    // handle cancellation
}

````

And that is it you can start processing payment in your react-native app.


## Note
The Android Platform might have build exceptions, showing dexing issues, and you would need to enable [Multidexing](https://developer.android.com/studio/build/multidex) to build successfully. You can take a look at the `Application` class in the android project, for reference.


