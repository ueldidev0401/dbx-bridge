// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;
contract BridgeAssistX {
    address public owner;
    mapping(address => uint256) public locked;
    mapping(address => bool) public directionE;

    modifier restricted {
        require(msg.sender == owner, "This function is restricted to owner");
        _;
    }

    event WriteEntry(address indexed sender, bool directionE, uint256 amount);
    event Collect(address indexed sender, bool directionE, uint256 amount);
    event Dispense(address indexed sender, bool directionE, uint256 amount);
    event TransferOwnership(address indexed previousOwner, address indexed newOwner);

    function writeEntry(bool _directionE) public payable {
        uint256 _e = locked[msg.sender];
        require(msg.value != _e, "Entry already contains this msg.value");
        if (_e > 0) {
            (bool _s, ) = msg.sender.call{value: _e}("");
            require(_s, "ETHO transfer failure. Contact contract owner");
        }
        locked[msg.sender] = msg.value;
        directionE[msg.sender] = _directionE;
        emit WriteEntry(msg.sender, _directionE, msg.value);
    }

    function collect(address _sender, uint256 _amount, bool _directionE) public restricted returns (bool success) {
        uint256 _e = locked[_sender];
        require(_e == _amount, "Amount check failed");
        require(directionE[_sender] == _directionE, "Direction check failed");
        locked[_sender] = 0;
        emit Collect(_sender, _directionE, _e);
        return true;
    }

    function dispense(address _sender, uint256 _amount, bool _directionE) public restricted returns (bool success) {
        (bool _s, ) = _sender.call{value: _amount}("");
        require(_s, "ETHO transfer failure. Contact contract owner");
        emit Dispense(_sender, _directionE, _amount);
        return true;
    }

    function transferOwnership(address _newOwner) public restricted {
        emit TransferOwnership(owner, _newOwner);
        owner = _newOwner;
    }

    constructor() {
        owner = msg.sender;
    }
}
