pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract DecentralisedUniversity {
    string public name;
    uint public studentCount = 0;
    mapping(uint => Student) public students;

    struct Student {
        uint id;
        string name;
        string studentId;
        string[] courses;
        address author;
    }

    event StudentCreated(
        uint id,
        string name,
        string studentId,
        string[] courses,
        address author
    );

    constructor() public {
        name = "Decentralised University";
    }

    function createStudent(string memory _name, string memory _studentId, string[] memory _courses) public {
        // Require valid content
        require(bytes(_name).length > 0);
        require(bytes(_studentId).length > 0);
        require(string[](_courses).length > 0);
        // Increment the student count
        studentCount++;
        // Create Student
        students[studentCount] = Student(studentCount, _name, _studentId, _courses, msg.sender);
        // Trigger Event
        emit StudentCreated(studentCount, _name, _studentId, _courses, msg.sender);
    }
}