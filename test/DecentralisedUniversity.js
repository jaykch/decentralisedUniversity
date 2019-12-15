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
        });

        describe('student', async () => {
            let result, studentCount;
            let studentResults = "GRD Semester 1 2019:Mobile Application Development:COSC:2309:12:1360:RAS:90:HD:International Onshore:AB:Full Fee - International Onshore (Subject To ESOS):310:Fee-pay overseas not sponsored:::Mar 4, 2019:Mar 31, 2019:Jun 28, 2019";

            before(async () => {
                result = await decentralisedUniversity.createStudent('Jay Kumar', "s3770282", studentResults, {from: author});
                studentCount = await decentralisedUniversity.studentCount();
            });

            it('creates student', async () => {

                // SUCCESS
                assert.equal(studentCount, 1);
                const event = result.logs[0].args;
                assert.equal(event.id.toNumber(), studentCount.toNumber(), 'id is correct');
                assert.equal(event.name, 'Jay Kumar', 'name is correct');
                assert.equal(event.studentId, 's3770282', 'name is correct');
                assert.deepEqual(event.results, studentResults, 'courses are correct');
                assert.equal(event.author, author, 'author is correct');

                // FAILURE: Post must have valid arguments
                await decentralisedUniversity.createStudent('', {from: author}).should.be.rejected;
            });

            it('lists student', async () => {
                const student = await decentralisedUniversity.students(studentCount);
                assert.equal(student.id.toNumber(), studentCount.toNumber(), 'id is correct');
                assert.equal(student.name, 'Jay Kumar', 'name is correct');
                assert.equal(student.studentId, 's3770282', 'name is correct');
                assert.equal(student.author, author, 'author is correct');
            });

            it('updates student', async () => {
                let studentResults = "GRD Semester 1 2019:Mobile Application Development:COSC:2309:12:1360:RAS:70:DI:International Onshore:AB:Full Fee - International Onshore (Subject To ESOS):310:Fee-pay overseas not sponsored:::Mar 4, 2019:Mar 31, 2019:Jun 28, 2019";
                result = await decentralisedUniversity.updateStudent(studentCount, studentResults, {from: updater});

                // SUCCESS
                const event = result.logs[0].args;
                assert.equal(event.id.toNumber(), studentCount.toNumber(), 'id is correct');
                assert.equal(event.name, 'Jay Kumar', 'name is correct');
                assert.equal(event.studentId, 's3770282', 'name is correct');
                assert.deepEqual(event.results, studentResults, 'courses are correct');
                assert.equal(event.author, author, 'author is correct');

                // FAILURE: Tries to update a student that does not exist
                await decentralisedUniversity.updateStudent(99, ['testing 1', 'testing 2'], {from: author}).should.be.rejected;

            });
        })
    })
});