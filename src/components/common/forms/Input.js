import React from 'react'

class Input extends React.Component {
  render () {
    let inputType = this.props.type || 'text'

    return (
      <div className='form-group'>
        <input
          className='form-control input-lg chat-input'
          type={inputType}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange} />
      </div>
    )
  }
}

export default Input
