#include <bits/stdc++.h>
using namespace std;
void solve() {
    int n;
    std::cin >> n;
    int point_map[128] = {0};
    point_map['2'] = 2; point_map['3'] = 3; point_map['4'] = 4; point_map['5'] = 5;
    point_map['6'] = 6; point_map['7'] = 7; point_map['8'] = 8; point_map['9'] = 9;
    point_map['T'] = 10; point_map['J'] = 10; point_map['Q'] = 10; point_map['K'] = 10; point_map['A'] = 11;
    int suit_scores[128] = {0};
    bool all_aces = true;
    bool all_same_rank = true;
    char first_rank = 0;
    for (int i = 0; i < n; ++i) {
        std::string card;w
        std::cin >> card;
        if (card.length() < 2) continue;
        char suit = card[0];
        char rank = card[1];
        if(card.length() == 3){
            rank = 'T';
        }
        suit_scores[suit] += point_map[rank];
        if (rank != 'A') all_aces = false;
        if (first_rank == 0) {
            first_rank = rank;
        } else if (rank != first_rank) {
            all_same_rank = false;
        }
    }
    if (n > 0 && all_aces) {
        std::cout << 200 << std::endl;
        return;
    }
    
    if (n > 0 && all_same_rank) {
        std::cout << 100 << std::endl;
        return;
    }
    
    int max_score = std::max({suit_scores['H'], suit_scores['C'], suit_scores['D'], suit_scores['S']});
    std::cout << max_score << std::endl;
}

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    int t;
    std::cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}


