#include <vector>
#include <string>
#include <map>
#include <utility>
bool canPlace(int r, int c, const std::vector<std::pair<int, int>>& shape, const std::vector<std::vector<int>>& grid) {
    int n = grid.size();
    int m = grid[0].size();
    for (const auto& block : shape) {
        int block_r = r + block.first;
        int block_c = c + block.second;
        //// isse sahi karo
        
        if (block_r < 0 || block_r >= n || block_c < 0 || block_c >= m) {
            return false;
        }
        if (grid[block_r][block_c] != 0) {
            return false;
        }
    }
    return true;
}
void placeFigure(int r, int c, const std::vector<std::pair<int, int>>& shape, std::vector<std::vector<int>>& grid, int figureNum) {
    for (const auto& block : shape) {
        grid[r + block.first][c + block.second] = figureNum;
    }
}
std::vector<std::vector<int>> solution(int n, int m, std::vector<char> figures) {
    std::vector<std::vector<int>> grid(n, std::vector<int>(m, 0));
    std::map<char, std::vector<std::pair<int, int>>> shapes;
    shapes['A'] = {{0, 0}};                                // Horizontal domino
    shapes['B'] = {{0, 0}, {1, 0}};                                // Vertical domino
    shapes['C'] = {{0, 0}, {0, 1}, {1, 0}, {1, 1}};                // 2x2 block
    shapes['D'] = {{0, 1}, {1, 0}, {1, 1}, {1, 2}};                // T shape
    shapes['E'] = {{0, 1}, {1, 0}, {1, 1}, {1, 2}, {2, 1}};        // Plus shape
    for (int i = 0; i < figures.size(); ++i) {
        char figureChar = figures[i];
        int figureNum = i + 1;
        const auto& currentShape = shapes.at(figureChar);
        bool isPlaced = false;
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < m; ++c) {
                if (canPlace(r, c, currentShape, grid)) {
                    placeFigure(r, c, currentShape, grid, figureNum);
                    isPlaced = true;
                    break;
                }
            }
            if (isPlaced) {
                break;
            }
        }
        if (!isPlaced) {
            // If figure couldn't be placed, we could handle this case
            // For now, we'll continue with the next figure
        }
    }

    return grid;
}