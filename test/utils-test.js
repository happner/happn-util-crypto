describe("crypto-test", function () {

  var chai = require('chai')
  , fs = require('fs')
  , should = chai.should()
  , expect = chai.expect
  , bitcore = require('bitcore-lib')
  , ECIES = require('bitcore-ecies');

  context('ecies', function(){

    it("tests bitcore icies", function (callback) {
      
      	var alicePrivateKey = new bitcore.PrivateKey();
		var bobPrivateKey = new bitcore.PrivateKey();

		var data = new Buffer('The is a raw data example');

		// Encrypt data
		var cypher1 = ECIES()
			.privateKey(alicePrivateKey)
			.publicKey(bobPrivateKey.publicKey);

		var encrypted = cypher1.encrypt(data);

		// Decrypt data
		var cypher2 = ECIES()
			.privateKey(bobPrivateKey)
			.publicKey(alicePrivateKey.publicKey);

		var decrypted = cypher2.decrypt(encrypted);

		callback();
       
    });

    it("tests bitcore icies", function (callback) {
      
      	try{
		  	var alicePrivateKey = new bitcore.PrivateKey();
			var bobPrivateKey = new bitcore.PrivateKey();
			var rayPrivateKey = new bitcore.PrivateKey();

			var data = new Buffer('The is a raw data example');

			// Encrypt data
			var cypher1 = ECIES()
				.privateKey(alicePrivateKey)
				.publicKey(bobPrivateKey.publicKey);

			var encrypted = cypher1.encrypt(data);

			// Decrypt data
			var cypher2 = ECIES()
				.privateKey(rayPrivateKey)
				.publicKey(alicePrivateKey.publicKey);

			var decrypted = cypher2.decrypt(encrypted);

			callback(new Error('this wasn\'t meant to happen'));

        }catch(e){
            expect(e.toString()).to.equal('Error: Invalid checksum');
            callback();
        }
       
    });

  });

});
