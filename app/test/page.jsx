'use client'
import React, { useEffect } from 'react'
import GlobalApi from '../api/GlobalApi'



const page = () => {

   const dataquiz = [
        "U2FsdGVkX1+1zo9higiuF5gxPX4b+j1Lr8Qm1vUdU8S1HjJXehrC0YgKl41542CeNB8pPkqgXSlIk8j12/lzcS06qVjUAWH69IWp3wsr4GCrZf66LIh7WsdK2ZUeY4fWiF0xsbxnKejjGXRpScxs251NRYZab754uvMpfCjykm4=",
        "U2FsdGVkX1+c02OtV0n1pcmlFfeLOi4DKt83Dr9hr6NOxkEhdi/EgpJ3ceVJCC64Af/w6XSsMdU9jPUB6g6a2k/bgraMhGA2E1u4iBAqpMX/76Oy4jqrygHrXr+9Cs7NaEeTai0UNBUWsxc1WICR+HEi4hM2gahggLJjaz9a9pI="
    ]


    dataquiz.map((item) => {
        const bytes = CryptoJS.AES.decrypt(item, 'jdfhaksjdh38457389475fjks46jy6i786kadhfkjsahdfkjash');
        const decryptedResult = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


    });
    return (
        <div>

        </div>
    )
}

export default page