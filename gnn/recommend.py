from flask import Flask, request, jsonify
import torch
import torch.nn.functional as F
from model import GCN
from graph import data, G

model = GCN(num_node_features=data.x.shape[1], hidden_channels=16)

def get_recommendations(song_id, top_k=5):
    model.eval()
    with torch.no_grad():
        out = model(data.x, data.edge_index)

    song_idx = list(G.nodes).index(song_id)
    song_embedding = out[song_idx]
    similarities = F.cosine_similarity(song_embedding.unsqueeze(0), out)
    recommended_indices = similarities.topk(k=top_k).indices

    recommended_song_ids = [list(G.nodes)[i] for i in recommended_indices]
    return recommended_song_ids

app = Flask(__name__)

@app.route('/recommend', methods=['GET'])
def recommend():
    song_id = request.args.get('song_id')
    top_k = int(request.args.get('top_k', 5))
    print(song_id)
    print("HEEE")
    if not song_id:
        return jsonify({'error': 'song_id is required'}), 400
    
    recommendations = get_recommendations(song_id, top_k)
    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
