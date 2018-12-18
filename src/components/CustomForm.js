import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, FormGroup, Button } from 'react-bootstrap';
import Input from './Input';

class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputsList: [],
            values: []
        }
    }

    componentDidMount() {
        let list = this.inputList();
        this.setState({ inputsList: list });
    }

    componentWillReceiveProps() {
        let list = this.inputList();
        this.setState({ inputsList: list });
    }

    onChange = (event) => {
        let val = this.state.values;
        val[event.target.id] = event.target.value;
        this.setState({values: val});
        this.props.onChange(this.state.values);
    }

    inputList = () => {
        let fields = this.props.fields;
        let list = fields.map(field =>
                    <Input key={field.id} type={field.type} id={field.id} label={field.label} defaultValue={field.defaultValue} onChange={this.onChange.bind(this)}></Input>
        );
        return list;
    }

    submit = (event) => {
        this.props.onSubmit(event);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.submit}>
                    {this.state.inputsList}
                    <Row>
                        <FormGroup>
                            <Col mdOffset={4} md={8}>
                                <Button type="submit" className="button" onClick={this.submit.bind(this)}>{this.props.buttonText}</Button>
                            </Col>
                        </FormGroup>
                    </Row>
                </form>
            </div>);
    }
}

CustomForm.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'letters']),
        label: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        defaultValue: PropTypes.string,
    }).isRequired),
    buttonText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

CustomForm.defaultProps = {
    fields: {
        type: 'text',
        defaultValue: ''
    },
    buttonText: 'Submit',
}

export default CustomForm;