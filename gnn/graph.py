import json
import networkx as nx
from get_mock_data import fetch_all_data
from torch_geometric.utils import from_networkx
import torch

G = nx.Graph()
songs, playlists = fetch_all_data()
songs_list = songs['data']['songContents']
for song in songs_list: 
    song_data = json.loads(song['content'])
    song_title = song_data['title']
    song_tags = song_data['tags']
    song_id = song['id']
    G.add_node(song_id, type='song', title=song_title)


data = from_networkx(G)
data.x = torch.eye(len(G.nodes))
