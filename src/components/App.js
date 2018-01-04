import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import NotFound from './NotFound';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
	
	constructor() {
		super();
		this.loadSamples = this.loadSamples.bind(this);
		this.addFish = this.addFish.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.state = {
			fishes: {},
			order: {}
		};
	}

	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
		{
			context: this,
			state: 'fishes'
		});

		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		if(localStorageRef){
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`, 
			JSON.stringify(nextState.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish(fish) {
		this.preventDefault();
		const fishes = {...this.state.fishes};
		const timeStamp = Date.now();
		fishes[`fish-${timeStamp}`] = fish;
		this.setState({fishes});
	}

	removeFish(key){
		const fishes= {...this.state.fishes};
		fishes[key] = null;
		this.setState({fishes});
	}

	updateFish(key,fish){
		const fishes = {...this.state.fishes}
		fishes[key] = fish;
		this.setState({fishes});
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		})
	}

	addToOrder(key) {
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({order});
	}

	removeFromOrder(key){
		const order = {...this.state.order};
		delete order[key];
		this.setState({order});
	}

	render(){
		return(
		<div className='catch-of-the-day'>
			<div className='Menu'>
				<Header tagline="Fresh Seafood Market"/>
				<ul className="list-of-fishes">
				{
					Object.keys(this.state.fishes)
					.map(key => <Fish key={key} index={key} removeFromOrder={this.removeFromOrder} addToOrder={this.addToOrder} details={this.state.fishes[key]}/>)
				}
				</ul>
			</div>
			<Order params={this.props.params} removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} order={this.state.order} />
			<Inventory removeFish={this.removeFish} updateFish={this.updateFish} fishes={this.state.fishes} addFish={this.addFish} loadSamples={this.loadSamples} />
		</div>
		)
	}
}

export default App