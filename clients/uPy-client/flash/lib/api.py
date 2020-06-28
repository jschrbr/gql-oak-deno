from graphqlclient import GraphQLClient
import json

client = GraphQLClient('https://parts-gql.herokuapp.com/graphql')


def getParts():
    result = client.execute('''
    {
        getParts{
                name
                id
                quantity
            }
    }
    ''')
    return result


def getPart(name):
    result = client.execute('''
    {{
        getPart(name: "{}"){{
                id
                name
                quantity
            }}
    }}
    '''.format(name))
    return result


def updateParts(id, quantity):
    result = client.execute('''
    mutation {{
        editPart(input:{{
            id:{}
            quantity: {}
        }}) {{
            done
        }}
    }}
    '''.format(id, quantity))
    pass
