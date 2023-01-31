const Card = ({ title, tagline, body }) => {
    return ( 
        <div className="notes border-[1px] p-4 rounded-md shadow-md cursor-pointer">
            <h1 className="text-3xl mb-2">{title}</h1>
            <p className="text-xl mb-2">{tagline}</p>
            <p className="text-sm">{body}</p>
        </div>
     );
}
 
export default Card;