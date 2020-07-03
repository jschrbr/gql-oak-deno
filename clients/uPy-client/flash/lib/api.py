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


def getPart(id):
    result = client.execute('''
    {{
        getPart(id: {}){{
                id
                name
                quantity
            }}
    }}
    '''.format(id))
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
