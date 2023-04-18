# FEUP-microservices_assisted_refactoring

## Tool name

The goal of this tool is to provide assisted refactoring to the migration from monolith to microservices by suggesting refactoring sequences


## Requirements

## Instalation and environment set up

## Usage

This tool expects two files as input:

- *the source code representation*: a json file with a representation of the code of each file, being the full name of the file the key in the dictionary and having at least the information about:..... For example: 
```json
{
    "pl.edu.wat.wcy.pz.restaurantServer.security.WebSecurityConfiguration":{

    }
}
```

- *the microservices decomposition suggestion*: a json file with the clusters suggested, using as key the identifier of the microservice and the correspondence being an array with the files that will belong to that microservice. For example:

```json
{
    "0": [
        "pl.edu.wat.wcy.pz.restaurantServer.security.WebSecurityConfiguration",
        "pl.edu.wat.wcy.pz.restaurantServer.security.jwt.JwtAuthEntryPoint",
        "pl.edu.wat.wcy.pz.restaurantServer.security.jwt.JwtAuthTokenFilter",
        "pl.edu.wat.wcy.pz.restaurantServer.security.jwt.JwtProvider"
    ], 
    "1": [
        ...
    ]
}

```

To run this tool run the following command:
```
python main.py [path to source code representation file] [path to decomposition representation file]
```
Example:
```
python main.py examples/source_code/restaurantServer.json examples/decompositions/restaurantServer.json
```
## Contribution


## License


## Documentation