describe("crypto-test", function () {

    var crypto;
    var expect;
    var cryptoUtil;

    if (typeof window == 'undefined'){
      	var chai = require('chai')
        , crypto = require('../lib/crypto')
        , expect = chai.expect
        , cryptoUtil = new crypto();
    }
    else{
        expect = window.expect;
        cryptoUtil = new window.Crypto();
    }

    before("initialize crypto library", function(callback){
        callback();
    });

    context('external functions', function(){

         it('can validate a public and private key', function() {

            var keys = cryptoUtil.createKeyPair();

            expect(cryptoUtil.validatePrivateKey(keys.privateKey, 'base64')).to.equal(true);
            expect(cryptoUtil.validatePublicKey(keys.publicKey, 'base64')).to.equal(true);

            expect(cryptoUtil.validatePrivateKey('DODGE')).to.equal(false);
            expect(cryptoUtil.validatePublicKey('DODGE')).to.equal(false);

        });

        it("encrypts data with a public key, and decrypt with a private key", function (callback) {

            var message = JSON.stringify({test:Date.now()});

            var encryptorKeys = cryptoUtil.createKeyPair();
            var decryptorKeys = cryptoUtil.createKeyPair();

            var encryptedData = cryptoUtil.asymmetricEncrypt(decryptorKeys.publicKey, encryptorKeys.privateKey, message);
            var decryptedData = JSON.parse(cryptoUtil.asymmetricDecrypt(encryptorKeys.publicKey, decryptorKeys.privateKey, encryptedData));

            expect(decryptedData.test).to.equal(JSON.parse(message).test);

            callback();
        });

        it("encrypts and decrypts a string", function (callback) {

          var testString = "this is a test";

          var encrypted = cryptoUtil.symmetricEncryptObject(testString, 'testkey');

           expect(encrypted).to.not.equal(testString);

          var decrypted = cryptoUtil.symmetricDecryptObject(encrypted, 'testkey');

          expect(decrypted).to.equal(testString);

          callback();

        });


        it("encrypts and decrypts an object", function (callback) {

          var testObj = {"test":"blah"};

          var encrypted = cryptoUtil.symmetricEncryptObject(testObj, 'testkey');

          var decrypted = cryptoUtil.symmetricDecryptObject(encrypted, 'testkey');

          expect(decrypted.test).to.equal(testObj.test);

          callback();

        });

    });

});



/*
describe('A test suite', function () {
    var expect = window.expect;

    beforeEach(function () {

    });

    afterEach(function () {

    });

    it('should fail', function () {
        expect(true).to.be.equal(false);
    });
});
*/