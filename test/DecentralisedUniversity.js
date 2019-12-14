const DecentralisedUniversity = artifacts.require('./DecentralisedUniversity.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('DecentralisedUniversity', ([deployer, author, updater]) => {
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

        describe('student', async () => {
            let result, studentCount;

            it('creates student', async () => {
                result = await decentralisedUniversity.createStudent('Jay Kumar', "s3770282", ['testing 1', 'testing 2'], {from: author});
                studentCount = await decentralisedUniversity.studentCount();

                // SUCCESS
                assert.equal(studentCount, 1);
                const event = result.logs[0].args;
                assert.equal(event.id.toNumber(), studentCount.toNumber(), 'id is correct');
                assert.equal(event.name, 'Jay Kumar', 'name is correct');
                assert.equal(event.studentId, 's3770282', 'name is correct');
                assert.deepEqual(event.courses, ['testing 1', 'testing 2'], 'courses are correct');
                assert.equal(event.author, author, 'author is correct');

                // FAILURE: Post must have valid arguments
                await decentralisedUniversity.createStudent('', {from: author}).should.be.rejected;
            });

            it('lists student', async () => {
                //TODO: Pending
            });

            it('updates student', async () => {
                //TODO: Pending
            });
        })
    })
});