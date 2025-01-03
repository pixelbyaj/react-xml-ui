# ReactXmlUI

This form is used to design React Readonly Form using any given XML/ISO 20022 messages. The primary use of this UI library is to design ISO 20022 or MX readonly forms dynamically.

![npm](https://img.shields.io/npm/v/react-xml-ui)
![NPM](https://img.shields.io/npm/l/react-xml-ui)
[![npm](https://img.shields.io/npm/dm/react-xml-ui)](https://npmjs.org/package/react-xml-ui)

## [DEMO](https://stackblitz.com/edit/reactxmlui?file=README.md)

## Features

- 🔥 Automatic forms generation from the given XML
- ⚡️ Supports ISO 20022 messages:

## How to consume

1. Install npm package ngx-xml-message.

```console
    npm i react-xml-ui
```

```ts
import { ReactXmlUI } from 'react-xml-ui';

function App() {
  const [xmlMessage, setXmlMessage] = useState('')

  useEffect(()=>{
    setXmlMessage(message);
  },[xmlMessage])
  return (
    <>
        <ReactXmlUI xmlString={xmlMessage}></ReactXmlUI>

    </>
  )
}

export default App
```
## Sample XML
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.09">
    <Hdr>
        <MsgId>ABC-123456</MsgId>
        <CreDtTm>2023-06-20T09:30:00Z</CreDtTm>
    </Hdr>
    <Rpt>
        <Id>ACC-78901234</Id>
        <ElctrncSeqNb>1</ElctrncSeqNb>
        <FrToDt>
            <FrDtTm>2023-06-01T00:00:00Z</FrDtTm>
            <ToDtTm>2023-06-30T23:59:59Z</ToDtTm>
        </FrToDt>
        <Acct>
            <Id>
                <IBAN>GB99X12345678901234567</IBAN>
            </Id>
        </Acct>
        <Bal>
            <Tp>
                <CdOrPrtry>
                    <Cd>PRCD</Cd>
                </CdOrPrtry>
            </Tp>
            <Amt Ccy="EUR">100000.00</Amt>
            <CdtDbtInd>CRDT</CdtDbtInd>
        </Bal>
        <Bal>
            <Tp>
                <CdOrPrtry>
                    <Cd>CLBD</Cd>
                </CdOrPrtry>
            </Tp>
            <Amt Ccy="EUR">2000.00</Amt>
            <CdtDbtInd>DBIT</CdtDbtInd>
        </Bal>
        <Ntry>
            <Amt Ccy="EUR">1000.00</Amt>
            <CdtDbtInd>CRDT</CdtDbtInd>
            <Sts>BOOK</Sts>
            <BookgDt>
                <Dt>2023-06-05</Dt>
            </BookgDt>
            <ValDt>
                <Dt>2023-06-05</Dt>
            </ValDt>
            <AcctSvcrRef>XYZ-987654</AcctSvcrRef>
            <NtryDtls>
                <TxDtls>
                    <Refs>
                        <EndToEndId>XYZ-123456</EndToEndId>
                    </Refs>
                    <AmtDtls>
                        <TxAmt>
                            <Amt Ccy="EUR">1000.00</Amt>
                        </TxAmt>
                    </AmtDtls>
                    <RltdPties>
                        <Dbtr>
                            <Nm>John Doe</Nm>
                            <Id>
                                <PrvtId>
                                    <Othr>
                                        <Id>1234567890</Id>
                                    </Othr>
                                </PrvtId>
                            </Id>
                        </Dbtr>
                        <Cdtr>
                            <Nm>Company XYZ</Nm>
                        </Cdtr>
                    </RltdPties>
                    <RmtInf>
                        <Ustrd>Payment for services rendered Payment for services rendered Payment for services rendered</Ustrd>
                    </RmtInf>
                </TxDtls>
            </NtryDtls>
        </Ntry>
        <!-- Additional Ntry elements can be added for more transactions -->
    </Rpt>
</Document>

```