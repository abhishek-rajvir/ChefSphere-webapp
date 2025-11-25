
// functional component for header
// only one default func / class can exist
export default function MyHeader(){ // lambda funtion
    return(
        <>
            <br></br>
            <h4 style={{"textAlign":"center","verticalAlign":"top"}}>
                ChefSphere 
                <small className="text-body-secondary">
                    - A platform for food enthusiasts and chef's
                </small>
            </h4>
        </>
    );
}