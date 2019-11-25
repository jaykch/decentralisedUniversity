const DecentralisedUniversity = artifacts.require('./DecentralisedUniversity.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('DecentralisedUniversity', (accounts) => {
    let decentralisedUniversity;

    before(async () => {
        decentralisedUniversity = await DecentralisedUniversity.deployed();
    });

    describe('deployment', async () => {
        it('Deployed Successfully', async () => {
            const address = await decentralisedUniversity.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });
        it('Name Authenticated', async () => {
            const name = await decentralisedUniversity.name();
            assert.equal(name, "Decentralised University");
        })

    })
});