// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICrossDomainMessenger {
    function xDomainMessageSender() external view returns (address);
    function sendMessage(
        address _target,
        bytes calldata _message,
        uint32 _gasLimit
    ) external;
}

contract Greeter {
    ICrossDomainMessenger public immutable MESSENGER;
    Greeter public immutable OTHER_GREETER;
    mapping (address => string) public greetings;

    constructor(
        ICrossDomainMessenger _messenger,
        Greeter _otherGreeter
    ) {
        MESSENGER = _messenger;
        OTHER_GREETER = _otherGreeter;
    }

    function sendGreeting(string memory _greeting) public {
        MESSENGER.sendMessage(
            address(OTHER_GREETER),
            abi.encodeCall(
                this.setGreeting,
                (
                    msg.sender,
                    _greeting
                )
            ),
            200000
        );
    }

    function setGreeting(address _sender, string memory _greeting) public {
        require(
            msg.sender == address(MESSENGER),
            "Greeter: Direct sender must be the CrossDomainMessenger"
        );

        require(
            MESSENGER.xDomainMessageSender() == address(OTHER_GREETER),
            "Greeter: Remote sender must be the other Greeter contract"
        );

        greetings[_sender] = _greeting;
    }
}
