import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
	constructor() {
		super()
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e, key){
		const fish = this.props.fishes[key]
		const updatedFish = {
			...fish,
			[e.target.name]:e.target.value,
		}
		this.props.updateFish(key, updatedFish)
	}

	renderInventory(key){
		const fish = this.props.fishes[key];
		return(
		<div className='fish-edit' key={key}>
			<input value={fish.name} name="name" type="text" placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
			<input value={fish.price} name="price" type="text" placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)} />
			<select value={fish.status} name='status' placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
				<option value="available">Fresh!</option>
				<option value="unavailable">Sold Out!</option>
			</select>
			<textarea value={fish.desc} onChange={(e) => this.handleChange(e, key)} name='desc' placeholder="Fish Desc"></textarea>
			<input value={fish.image} onChange={(e) => this.handleChange(e, key)} 
			 name='image' type="text" placeholder="Fish Image" />
			 <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
		</div>
		)
	}

	render(){
		return(
			<div>
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

export default Inventory;