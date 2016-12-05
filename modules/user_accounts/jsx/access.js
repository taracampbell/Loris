var Role = React.createClass({
    getInitialState: function() {
        return {
            value: false
        };
    },
    addPermissions: function() {
        var event = new CustomEvent('updatePermissions');
        window.dispatchEvent(event);
    },
    removePermissions: function() {
        var event = new CustomEvent('updatePermissions');
        window.dispatchEvent(event);
    },
    handleCheck: function(event) {
        this.setState({value: event.target.value});
        if (event.target.checked) {
            this.addPermissions(event.target.id);
        }
        if (!event.target.checked) {
            this.removePermissions(event.target.id);
        }
    },
    render: function() {
        return (
            <div className="checkbox role">
                <label>
                    <input
                        type="checkbox"
                        value={this.state.value}
                        id={this.props.id}
                        onChange={this.handleCheck}
                    />
                    {this.props.name}
                </label>
            </div>
        );
    }
});

var RoleList = React.createClass({
    render: function() {
        var roleNodes = this.props.data.map(function(role) {
            return (
                <Role name={role.name} id={role.id} />
            );
        });
        return (
            <div className="roleList col-md-3">
                <label>Roles</label>
                {roleNodes}
            </div>
        );
    }
});

var Permission = React.createClass({
    getInitialState: function() {
        return {
            value: false
        };
    },
    handleCheck: function(event) {
        this.setState({value: event.target.value});
    },
    render: function() {
        return (
            <div className="checkbox permission">
                <label>
                    <input
                        type="checkbox"
                        value={this.state.value}
                        id={this.props.id}
                        onChange={this.handleCheck}
                    />
                    {this.props.name}
                </label>
            </div>
        );
    }
});

var PermissionList = React.createClass({
    updatePermissions: function() {
        
    },
    componentDidMount: function() {
        window.addEventListener('updatePermissions', this.updatePermissions);
    },
    render: function() {
        var permissionNodes = this.props.data.map(function(permission) {
            return (
                <Permission name={permission.name} id={permission.id} />
            );
        });
        return (
            <div className="permissionList col-md-7">
                <label>Permissions</label>
                {permissionNodes}
            </div>
        );
    }
});

var Access = React.createClass({
    getInitialState: function() {
        return {
            roles: [],
            permissions: []
        };
    },
    loadDataFromServer: function() {
        $.ajax({
            url: this.props.dataURL,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    roles: data.roles,
                    permissions: data.permissions
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.dataURL, status, err.toString());
            }.bind(this)
        })
    },
    componentDidMount: function() {
        this.loadDataFromServer();
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function() {
        return (
            <div className="Access">
                <label className="col-sm-2">Access</label>
                <RoleList data={this.state.roles} />
                <PermissionList data={this.state.permissions} />
            </div>
        );
    }
});

var RAccess = React.createFactory(Access);