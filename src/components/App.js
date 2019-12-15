import React, {Component} from 'react';
import logo from '../logo.png';
import Web3 from 'web3';
import './App.css';
import DecentralisedUniversity from '../abis/DecentralisedUniversity.json'
import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

class App extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('No Ethereum connection detected!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        // Load account
        const accounts = await web3.eth.getAccounts();
        this.setState({account: accounts[0]});
        // Network ID
        const networkId = await web3.eth.net.getId();
        const networkData = DecentralisedUniversity.networks[networkId]
        if (networkData) {
            const decentralisedUniversity = web3.eth.Contract(DecentralisedUniversity.abi, networkData.address);
            this.setState({decentralisedUniversity});
            const studentCount = await decentralisedUniversity.methods.studentCount().call();
            this.setState({studentCount});
            // Load Students
            for (let i = 1; i <= studentCount; i++) {
                const student = await decentralisedUniversity.methods.students(1).call();
                this.setState({
                    students: [...this.state.students, student]
                });
            }
        } else {
            window.alert('Decentralised University contract not deployed on the network!')
        }
        // ABI
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            decentralisedUniversity: null,
            studentCount: 0,
            students: []
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container-fluid mt-5">
                    <div className="row">
                        {this.state.students.map((student, key) => {
                            return (
                                <Card key={key} className="m-auto">
                                    <Card.Body>
                                        <Card.Title>{student.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{student.studentId}</Card.Subtitle>
                                        <Table striped bordered hover variant="dark" size="sm">
                                            <thead>
                                            <tr>
                                                <th>Term</th>
                                                <th>Course</th>
                                                <th>Subject Area</th>
                                                <th>Catalog Nbr</th>
                                                <th>Credit Points/SCH</th>
                                                <th>Class Nbr</th>
                                                <th>Session</th>
                                                <th>Grade Code</th>
                                                <th>Grade</th>
                                                <th>BroadFund Source</th>
                                                <th>RMIT Fund Source Code</th>
                                                <th>Description</th>
                                                <th>Liability Status Code</th>
                                                <th>Liability Status</th>
                                                <th>TAFE Module ID</th>
                                                <th>TAFE Attendance Confirmed</th>
                                                <th>Start Date</th>
                                                <th>Census Date</th>
                                                <th>End Date</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                {
                                                    student.results.split(":").map((data, index) => {
                                                        return (
                                                            <td key={index}>{data}</td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                            </tbody>
                                        </Table>

                                    </Card.Body>
                                </Card>
                            )
                        })

                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
