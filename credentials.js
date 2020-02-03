import { IswSdkConfig } from 'react-native-isw-mobile-sdk'

const merchantId = "your-merchant-id",
 merchantCode = "your-merchant-code",
 merchantSeceret = "your-merchant-seceret",
 currencyCode = "currency-code"; // e.g. 566

export default new IswSdkConfig(
    merchantId, 
    merchantSeceret,
    merchantCode,
    currencyCode
)