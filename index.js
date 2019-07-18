// fake added:
server_public_key = '048f7e89decacffa46616ecc923e8c0621b43c3a208b9b0591eb2ef187b5d49b1d29db720c82699df9872baf34706adc13302fa3c2e99520699b0b728321fa1644'

const crypto = require('crypto');
var sha512 = crypto.createHash("sha512");

var EC = require('elliptic').ec;
var ec = new EC('p256');

// Generate keys

// 1) generate random key pair
var key_pair_random = ec.genKeyPair();

// 2) generate key pair from the public key
var key_pair_public_key = ec.keyFromPublic(server_public_key, 'hex')

// 3) get the public key from the server key pair
var enc_key = key_pair_public_key.getPublic()

// 4) add the encrypted key to the random key pair, by thus produce a shared someting
var unparsed_shared_secret = key_pair_random.derive(enc_key);

// 5) turn the shared something into a string (which is the secret)
var derived_secret = Buffer.from(unparsed_shared_secret.toString(16), 'hex')

// at this point, the derived secret is:
// [221, 48, 59,107,78,219,127,153,90,88,162,154,109,155,234,171,205,170,137,190,52,58,167,18,203,92,173,51,13,93,196,79]


// 6) get
var public_key_client = key_pair_random.getPublic('hex')

console.log(derived_secret)
console.log(public_key_client)
// at this point, the public key client is:
// 0477a1a28a3375ff38ee5586ee3642a91af06cedbbc2ca249aba293119f429d89786d6e0cc831ff817c08d9b177b728aecf9581476e030c3cd4207175c517bf7f0
//
// var pre_salt = Buffer.from('d637f1aae2f0418c', 'hex')
// var post_salt = Buffer.from('a8f81a574e228ab7', 'hex')
// derived_secret = Buffer.from(pre_salt.toString('hex')+derived_secret.toString('hex')+post_salt.toString('hex'), 'hex')
// // Hash shared secret
// var sha = sha512.update(derived_secret);
// derived_secret = sha.digest();
//
// return {
//     public_key: public_key_client.toString('hex').slice(2),
//     secret: derived_secret.toString('hex')
// }

