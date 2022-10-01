---
title: Neighbours in Matrix (in Clojure)
layout: post
---

Code snip of how to find neighbours in a matrix:

```clojure
(ns core)

(defn build-matrix
  [rows cols]
  (mapv (fn [row] 
          (vec (range (+ 1 (* row cols))  
                      (+ (* (+ row 1) cols) 1)))) 
        (range 0 rows)))

(defn build-square-matrix
  [size]
  (build-matrix size size))

(defn neighbours
  ([matrix start-pos]
   (neighbours [[-1 0] [+1 0] [0 1] [0 -1]] matrix start-pos))
  ([neighbouring matrix start-pos]
   (let [neighbour-positions (map #(mapv + start-pos %) neighbouring)]
     (filterv #(get-in matrix %) neighbour-positions))))

(defn neighbours-vals
  "Access values in a matrix by xy position, starting at [0,0]"
  [matrix start-pos]
  (mapv #(get-in matrix %) (neighbours matrix start-pos)))

(comment
  (def matrix (build-square-matrix 10))
  (neighbours matrix [1 1])
  (get-in matrix [1 1])
  (neighbours-vals matrix [1 1])
  (get-in matrix [4 4])
  (neighbours-vals matrix [4 4])
  ;;
  )
```