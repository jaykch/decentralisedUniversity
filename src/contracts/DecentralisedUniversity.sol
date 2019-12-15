pragma solidity ^0.5.0;

contract DecentralisedUniversity {
    string public name;
    uint public studentCount = 0;
    mapping(uint => Student) public students;

    struct Student {
        uint id;
        string name;
        string studentId;
        string results;
        address author;
    }

    event StudentCreated(
        uint id,
        string name,
        string studentId,
        string results,
        address author
    );

    event StudentUpdated(
        uint id,
        string name,
        string studentId,
        string results,
        address author
    );

    constructor() public {
        name = "Decentralised University";
    }

    function createStudent(string memory _name, string memory _studentId, string memory _results) public {
        // Require valid content
        require(bytes(_name).length > 0);
        require(bytes(_studentId).length > 0);
        require(bytes(_results).length > 0);
        // Increment the student count
        studentCount++;
        // Create Student
        students[studentCount] = Student(studentCount, _name, _studentId, _results, msg.sender);
        // Trigger Event
        emit StudentCreated(studentCount, _name, _studentId, _results, msg.sender);
    }

    function updateStudent(uint _id, string memory _results) public {
        // Make sure the id is valid
        require(_id > 0 && _id <= studentCount);
        // Fetch student
        Student memory _student = students[_id];
        // Fetch author
        address _author = _student.author;
        // Update results
        _student.results = _results;
        // Submit results
        students[_id] = _student;
        emit StudentUpdated(studentCount, _student.name, _student.studentId, _student.results, _author);

    }
}