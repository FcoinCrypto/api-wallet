import { Stx } from '../../../src';
import { KeyPair } from '../../../src/coin/stx/keyPair';

/*
 * keys and addresses are from:
 *
 * import * as st from '@stacks/transactions';
 *
 * const secretKey1 = st.privateKeyToString(st.makeRandomPrivKey());
 * const publicKey1 = st.publicKeyToString(st.pubKeyfromPrivKey(secretKey1.data);
 * const address1 = st.getAddressFromPrivateKey(secretKey1);
 * etc.
 */

export const secretKey1 = '66c88648116b721bb2f394e0007f9d348ea08017b6e604de51a3a7d957d58524';
export const pubKey1 =
  '04a68c2d6fdb3706b39f32d6f4225275ce062561908fd7ca540a44c92eb8594ea6db9fcfe0b390c0ead3f45c36afd682eab62eb124a63b460945fe1f7c7f8a09e2';
export const address1 = 'SP10FDHQQ4F2F0KHMN6Z24RMAMGX5933SQJCWKAAR';

export const secretKey2 = '35794adf0dd2a313c18bc118b422740bb94f85114134be34703ff706658087e4';
export const pubKey2 =
  '0421d6f42c99f7d23ec2c0dc21208a9c5edfce4e5bc7b63972e68e86e3cea6f41a94a9a7c24a1ccd83792173f475fdb590cc82f94ff615df39142766e759ce6387';
export const pubKey2Compressed = '0321d6f42c99f7d23ec2c0dc21208a9c5edfce4e5bc7b63972e68e86e3cea6f41a';
export const address2 = 'SPS4HSXAD1WSD3943WZ52MPSY9WPK56SDG54HTAR';

// extended private/public keys
// STX does not use them
export const xprv1 =
  'xprv9s21ZrQH143K34bdhCWMuiuHfdjQB21gu95NwpeGEEfGMWs7tA5s3PMBBPeJmXn5DQ3vv8Hp8kq1KrsaJJnczW3BMztL2VGTnxVPgVjgq1H';
export const xpub1 =
  'xpub661MyMwAqRbcFYg6oE3NGrr2DfZtaUjYGMzykD3snaCFEKCGRhQ7bBff2g3CYvyYPQMGSwSe1DH8GXvP6uB3iiWsPGGMbXVZGkrk1UxQVk6';
export const xprv1Protocol = '73ea19aea25e87c4ee8eaee21417442ac9eb6898f4538ade8f2091d1d2c5946d';
export const xpub1Protocol =
  '042794bc43d75db0e8589987818754aa2f820a350a5742efaf0d50518fcbc6a80c597aa51aa8e755fd10b753f7e36410849171a99d8533f6ea84a0c4dfbe6e2419';
export const xpub1ProtocolCompressed = '032794bc43d75db0e8589987818754aa2f820a350a5742efaf0d50518fcbc6a80c';

export const ACCOUNT_1 = {
  prv: secretKey1,
  pub: pubKey1,
  address: address1,
};

export const ACCOUNT_2 = {
  prv: secretKey2,
  pub: pubKey2,
  address: address2,
};

export const SENDER_1 = {
  prv: 'edf9aee84d9b7abc145504dde6726c64f369d37ee34ded868fabd876c26570bc01',
};

export const RECIPIENT_1 = {
  address: 'SP3FGQ8Z7JY9BWYZ5WM53E0M9NK7WHJF0691NZ159',
};

export const defaultKeyPairFromPrv = new Stx.KeyPair({
  prv: secretKey1,
});

export const defaultKeyPairFromPub = new Stx.KeyPair({
  pub: pubKey2,
});

// verify signatures
export const message1 = 'abc';
// when signed with secretKey1
export const expectedSignature1 =
  '0157a170fae4a310c4b59b8d173289b4adacb79b0a187a6e132cdf02374c22b59519b862d95240af464808faaed341fe42d740c9b89850b52f5f7f906deba67064';

export const message2 = 'hello';
// when signed with secretKey2
export const expectedSignature2 =
  '007a86b0a5486987605f7274272cb4eaefa37af216bdf0c88c5b985a70923d550032b3cf226a8384ad2b96d0b3794b9a6f8e6ed191582fb0cc4f830b2ef14d05fe';

// seed is Buffer.alloc(64) -- all zero bytes
export const defaultSeedSecretKey = 'eafd15702fca3f80beb565e66f19e20bbad0a34b46bb12075cbf1c5d94bb27d2';
export const defaultSeedPubKey =
  '04669261fe20452fe6a03e625944c6a0523e6350b3ea8cbd37c9ca1ff97e3ac8bf3dd2d51a09d6d4831cb2bc9828c5af14ce4c3384c973d75aad423626a2a6d18d';

export const defaultSeedAddressUncompressedMainnet = 'SP21X8PMH8T4MVX8Z75JZPYEVA6Q8FDR7PJ13MV4Q';
export const defaultSeedAddressUncompressedTestnet = 'ST21X8PMH8T4MVX8Z75JZPYEVA6Q8FDR7PG88WTVF';
export const defaultSeedAddressCompressedMainnet = 'SP31MBRF9J8W22W3044MEAZDXFMM85699653ZKR7Q';
export const defaultSeedAddressCompressedTestnet = 'ST31MBRF9J8W22W3044MEAZDXFMM8569967TF1R41';

export const INVALID_KEYPAIR_PRV = new KeyPair({
  prv: '8CAA00AE63638B0542A304823D66D96FF317A576F692663DB2F85E60FAB2590C',
});

export const TX_SENDER = {
  prv: 'cb3df38053d132895220b9ce471f6b676db5b9bf0b4adefb55f2118ece2478df01',
  pub: '03797dd653040d344fd048c1ad05d4cbcb2178b30c6a0c4276994795f3e833da41',
  address: 'STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6',
};

export const TX_RECIEVER = {
  address: 'STDE7Y8HV3RX8VBM2TZVWJTS7ZA1XB0SSC3NEVH0',
};

export const RAW_TX_UNSIGNED =
  '80800000000400164247d6f2b425ac5771423ae6c80c754f7172b0000000000000000000000000000000b400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003020000000000051a1ae3f911d8f1d46d7416bfbe4b593fd41eac19cb00000000000003e800000000000000000000000000000000000000000000000000000000000000000000';

export const SIGNED_TRANSACTION =
  '80800000000400164247d6f2b425ac5771423ae6c80c754f7172b0000000000000000000000000000000b400011ae06c14c967f999184ea8a7913125f09ab64004446fca89940f092509124b9e773aef483e925476c78ec58166dcecab3875b8fab8e9aa4213179d164463962803020000000000051a1ae3f911d8f1d46d7416bfbe4b593fd41eac19cb00000000000003e800000000000000000000000000000000000000000000000000000000000000000000';

// right length and format, but invalid
export const invalidPubKey1 = '0321d6f42c99f7d23ec2c0dc2120800c5edfce4e5bc7b63972e68e86e3cea6f41a';
export const invalidPubKey2 =
  '04a68c2d6fdb3706b39f32d6f4225275ce062561908fd7ca540a44c92eb8594ea6db9fcfe0b390c0ead3f45c36afd682eab62eb124a63b460945fe1f7c7f8a09e1';

// multi sig
export const prv1 = '21d43d2ae0da1d9d04cfcaac7d397a33733881081f0b2cd038062cf0ccbb752601';
export const prv2 = 'c71700b07d520a8c9731e4d0f095aa6efb91e16e25fb27ce2b72e7b698f8127a01';
export const prv3 = 'e75dcb66f84287eaf347955e94fa04337298dbd95aa0dbb985771104ef1913db01';
export const pub1 = '02b087ca52f40fdfdf4b16a0bbf7e91e4db2e183ac5c6491a5f60a5450e25de7d0';
export const pub2 = '024abddd63b56c55cd1ed0803c26c473f5f0b9d8473b37b65bd812f035365f154b';
export const pub3 = '038e3c4529395611be9abf6fa3b6987e81d402385e3d605a073f42f407565a4a3d';
export const MULTI_SIG_SINGED_TRANSACTION =
  '808000000004012fe507c09dbb23c3b7e5d166c81fc4b87692510b000000000000000000000000000000b400000003020123d6d3d22d2ca1b7310f5c45314d1e783c03193e1bb5e08685fc1a48f8bdac7c0d93a463efee18b9b41fffe38d4b4c7475809a37c0fd53f52cef456a8d9280db020010b311f82b1b111eb5efa16c4790687b16dc92b7b4d07a1f0f1fe65baee43eb02ede226f807a097237e7d0ee3aa4fdf9b6287dd23d819ec560df180875f4019a00038e3c4529395611be9abf6fa3b6987e81d402385e3d605a073f42f407565a4a3d000203020000000000051a1ae3f911d8f1d46d7416bfbe4b593fd41eac19cb00000000000003e874657374206d656d6f00000000000000000000000000000000000000000000000000';

// contract call
export const CONTRACT_ADDRESS = 'ST000000000000000000002AMW42H';
export const CONTRACT_NAME = 'pox';
export const CONTRACT_FUNCTION_NAME = 'stack-stx';
export const SIGNED_CONTRACT_CALL =
  '80800000000400164247d6f2b425ac5771423ae6c80c754f7172b0000000000000000000000000000000b4000009d038cfc4db2b0fa3d590b89363a762897fef5c7385b88bc4d4e6fb667f062c293b00b8a6a1750e30b4c90bb539df81cdd522f46ff66da1c7af1c66803352b5030200000000021a000000000000000000000000000000000000000003706f7809737461636b2d73747800000001000000000000000000000000000000007b';
export const MULTI_SIG_CONTRACT_CALL =
  '808000000004012fe507c09dbb23c3b7e5d166c81fc4b87692510b000000000000000000000000000000b4000000030201060e76319e3b5353b73c504ef3ccdd5b9742726efc4ca9f5ea4f52ea2749b22660e2af4f2772fd7f452a08781fa5eebc72bc96df367d8ec1535458822ca21fd30200b955830292ac49dad9581397176d58d0fcc83497ec7d0ec560152ee8ff4178dd4a29300c028a8da03cc272c4aee2033487ed014086697359366d989725693c3200038e3c4529395611be9abf6fa3b6987e81d402385e3d605a073f42f407565a4a3d0002030200000000021a000000000000000000000000000000000000000003706f7809737461636b2d73747800000001000000000000000000000000000000007b';
