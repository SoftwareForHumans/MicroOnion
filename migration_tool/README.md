# Migration tool
This tool corresponds to the suggester of the refactoring sequences given an intended decomposition and a source code representation.

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

## Output

This tool output files of the following types:

* *dependencies* file: file containing the dependencies identified in each microservice
    - Example: this example contains the dependencies of service 0, that only depends on service 1. Three files of service 0 (WebSecurityConfiguration, JwtAuthTokenFilter and JwtProvider) have dependencies to service 1 files.
    ```json
    {
    "0": {
        "1": {
            "WebSecurityConfiguration": [
                [
                    "pl.edu.wat.wcy.pz.restaurantServer.security.service.UserDetailsServiceImpl",
                    "variableType"
                ]
            ],
            "JwtAuthTokenFilter": [
                [
                    "pl.edu.wat.wcy.pz.restaurantServer.security.service.UserDetailsServiceImpl",
                    "methodInvocation",
                    "variableType"
                ]
            ],
            "JwtProvider": [
                [
                    "pl.edu.wat.wcy.pz.restaurantServer.security.service.UserPrinciple",
                    "methodInvocation"
                ]
            ]
            }
        }, ...
    }

    ```
* *refactoring sequence* file: file containing the refactoring sequence to perform the refactoring into a inteded decomposition and additional information of how to apply each refactoring.
    - Example: the restaurant server needs multiple refactorings to be decompose, this example includes the extraction of service 0.
    ```json
    {
    "project_name": "restaurantServer",
    "refactorings": [
        {
            "id": 1,
            "name": "EXTRACT MICROSERVICE",
            "level": 1,
            "microservice": "0",
            "dependent_microservice": "-1",
            "notes": {},
            "refactorings": [
                {
                    "id": 2,
                    "name": "BREAK DATA TYPE DEPENDENCY",
                    "level": 2,
                    "microservice": "0",
                    "dependent_microservice": "1",
                    "notes": {
                        "file": "WebSecurityConfiguration",
                        "dependent_file": "pl.edu.wat.wcy.pz.restaurantServer.security.service.UserDetailsServiceImpl",
                        "dependencies": [
                            "variableType"
                        ]
                    },
                    "refactorings": [
                        {
                            "id": 3,
                            "name": "CREATE DATA TRANSFER OBJECT",
                            "level": 3,
                            "microservice": "0",
                            "dependent_microservice": "1",
                            "notes": {
                                "created": "UserDetailsServiceImplDTO",
                                "dependent": "pl.edu.wat.wcy.pz.restaurantServer.security.service.UserDetailsServiceImpl"
                            }
                        }
                    ]
                },
            ]
            }], ...
        }

    ```
* *snapshot of the system* file: file containing the snapshot of the system at a given moment of the refactoring.
    - Example: the project restaurantServer has multiple services, this is the example of one service in the file.
    ```json
    {
    "project_name": "restaurantServer",
    "snapshot_number": 0,
    "services": [
        {
            "id": "0",
            "files": [
                "pl.edu.wat.wcy.pz.restaurantServer.security.WebSecurityConfiguration",
                "pl.edu.wat.wcy.pz.restaurantServer.security.jwt.JwtAuthEntryPoint",
                "pl.edu.wat.wcy.pz.restaurantServer.security.jwt.JwtAuthTokenFilter",
                "pl.edu.wat.wcy.pz.restaurantServer.security.jwt.JwtProvider"
            ],
            "new_classes": [],
            "service_calls": [],
            "dtos": [],
            "interfaces": [],
            "dependencies": {
                "1": {
                    "WebSecurityConfiguration": [
                        [
                            "pl.edu.wat.wcy.pz.restaurantServer.security.service.UserDetailsServiceImpl",
                            "variableType"
                        ]
                    ],
                    "JwtAuthTokenFilter": [
                        [
                            "pl.edu.wat.wcy.pz.restaurantServer.security.service.UserDetailsServiceImpl",
                            "methodInvocation",
                            "variableType"
                        ]
                    ],
                    "JwtProvider": [
                        [
                            "pl.edu.wat.wcy.pz.restaurantServer.security.service.UserPrinciple",
                            "methodInvocation"
                        ]
                    ]
                }
            },
            "independent": false
        },...
    ]}
    ```