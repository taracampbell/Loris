'use strict';

var Role = React.createClass({
    displayName: 'Role',

    getInitialState: function getInitialState() {
        return {
            value: false
        };
    },
    addPermissions: function addPermissions() {
        var event = new CustomEvent('updatePermissions');
        window.dispatchEvent(event);
    },
    removePermissions: function removePermissions() {
        var event = new CustomEvent('updatePermissions');
        window.dispatchEvent(event);
    },
    handleCheck: function handleCheck(event) {
        this.setState({ value: event.target.value });
        if (event.target.checked) {
            this.addPermissions(event.target.id);
        }
        if (!event.target.checked) {
            this.removePermissions(event.target.id);
        }
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'checkbox role' },
            React.createElement(
                'label',
                null,
                React.createElement('input', {
                    type: 'checkbox',
                    value: this.state.value,
                    id: this.props.id,
                    onChange: this.handleCheck
                }),
                this.props.name
            )
        );
    }
});

var RoleList = React.createClass({
    displayName: 'RoleList',

    render: function render() {
        var roleNodes = this.props.data.map(function (role) {
            return React.createElement(Role, { name: role.name, id: role.id });
        });
        return React.createElement(
            'div',
            { className: 'roleList col-md-3' },
            React.createElement(
                'label',
                null,
                'Roles'
            ),
            roleNodes
        );
    }
});

var Permission = React.createClass({
    displayName: 'Permission',

    getInitialState: function getInitialState() {
        return {
            value: false
        };
    },
    handleCheck: function handleCheck(event) {
        this.setState({ value: event.target.value });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'checkbox permission' },
            React.createElement(
                'label',
                null,
                React.createElement('input', {
                    type: 'checkbox',
                    value: this.state.value,
                    id: this.props.id,
                    onChange: this.handleCheck
                }),
                this.props.name
            )
        );
    }
});

var PermissionList = React.createClass({
    displayName: 'PermissionList',

    updatePermissions: function updatePermissions() {},
    componentDidMount: function componentDidMount() {
        window.addEventListener('updatePermissions', this.updatePermissions);
    },
    render: function render() {
        var permissionNodes = this.props.data.map(function (permission) {
            return React.createElement(Permission, { name: permission.name, id: permission.id });
        });
        return React.createElement(
            'div',
            { className: 'permissionList col-md-7' },
            React.createElement(
                'label',
                null,
                'Permissions'
            ),
            permissionNodes
        );
    }
});

var Access = React.createClass({
    displayName: 'Access',

    getInitialState: function getInitialState() {
        return {
            roles: [],
            permissions: []
        };
    },
    loadDataFromServer: function loadDataFromServer() {
        $.ajax({
            url: this.props.dataURL,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({
                    roles: data.roles,
                    permissions: data.permissions
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.dataURL, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function componentDidMount() {
        this.loadDataFromServer();
    },
    componentWillUnmount: function componentWillUnmount() {
        this.serverRequest.abort();
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'Access' },
            React.createElement(
                'label',
                { className: 'col-sm-2' },
                'Access'
            ),
            React.createElement(RoleList, { data: this.state.roles }),
            React.createElement(PermissionList, { data: this.state.permissions })
        );
    }
});

var RAccess = React.createFactory(Access);