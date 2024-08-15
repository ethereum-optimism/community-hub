// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyFirstContract {
    string public message;

    function setMessage(string memory _message) public {
        message = _message;
    }
}
