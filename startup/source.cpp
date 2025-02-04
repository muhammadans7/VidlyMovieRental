#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

// Function to check if a subset of activities is non-conflicting
bool isValidSubset(const vector<int>& s, const vector<int>& f, const vector<int>& subset) {
    for (int i = 0; i < subset.size(); i++) {
        for (int j = i + 1; j < subset.size(); j++) {
            if (!(f[subset[i]] <= s[subset[j]] || f[subset[j]] <= s[subset[i]])) {
                return false;
            }
        }
    }
    return true;
}



// Brute force implementation
vector<int> bruteForceActivitySelection(const vector<int>& act, const vector<int>& s, const vector<int>& f) {
    int n = act.size();
    vector<int> maxSet;
    int maxActivities = 0;

    // Iterate through all subsets
    for (int i = 0; i < (1 << n); i++) { // Generate all subsets
        vector<int> subset;
        for (int j = 0; j < n; j++) {
            if (i & (1 << j)) subset.push_back(j);
        }

        if (isValidSubset(s, f, subset) && subset.size() > maxActivities) {
            maxActivities = subset.size();
            maxSet = subset;
        }
    }

    // Convert indices to activity IDs
    vector<int> solutionSet;
    for (int idx : maxSet) {
        solutionSet.push_back(act[idx]);
    }

    return solutionSet;
}

int main() {
    vector<int> act = { 1, 2, 3, 4, 5, 6 };
    vector<int> s = { 1, 3, 0, 5, 8, 5 };
    vector<int> f = { 2, 4, 6, 7, 9, 9 };

    vector<int> result = bruteForceActivitySelection(act, s, f);
    cout << "Selected activities (IDs - Brute Force): ";
    for (int id : result) cout << id << " ";
    cout << endl;

    return 0;
}