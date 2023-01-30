import '../css/List.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

export const List = ({stays}) => {
	return (
		<div className="list">
			{
				stays.map((element, index) => {
					return (
						<div className="stay" key={index}>
							<div className="img-container">
								<img src={element.photo} alt="hotel in finland"/>
							</div>
							<div>
								{element.superHost ? <span className="superHost">SUPER HOST</span> : ''}
								{
									element.type === 'Entire apartment' ? (
											<span className="type">{element.type} . {element.beds} beds</span>
										) : <span className="type">{element.type}</span>
								}
								<span className="rating">
									<FontAwesomeIcon icon={faStar}/>
									{element.rating}
								</span>
							</div>
							<p className="title">{element.title}</p>
						</div>
					)
				})
			}
		</div>
	)
}