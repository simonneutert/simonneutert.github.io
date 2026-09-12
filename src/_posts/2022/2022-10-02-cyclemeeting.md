---
title: schedule a cyclemeet with friends
layout: post
---

```clojure
(ns cyclemeeting.core (:require [java-time :as t]))

(def now (t/local-date-time))

(def meeting-time (atom now))

(defn time-formatter
  [time]
  (t/format
   (t/with-zone (t/formatter "HH:mm") (t/zone-id)) time))

(defn set-meeting-time [hour minutes]
  (swap! meeting-time t/local-time hour minutes)
  (println "Treffpunkt ist um" (time-formatter @meeting-time) "Uhr."))

(defn start-ride
  [meeting-time rider minutes]
  (let [departure-time (t/minus meeting-time (t/minutes minutes))]
    (println rider "muss um" (time-formatter departure-time) "Uhr losfahren.")
    [departure-time rider minutes]))

(defn pick-up-rider
  [start-time-rider rider-new minutes]
  (let [[start-time rider total-time] start-time-rider short-meeting-time (t/plus start-time (t/minutes minutes))]
    (println rider "holt" rider-new "um" (time-formatter short-meeting-time) "Uhr ab.")
    (start-ride short-meeting-time rider-new 0)
    (println "Bis zum Treffpunkt fahren" rider "und" rider-new "gemeinsam noch" (- total-time minutes) "Minuten.")
    short-meeting-time))

(defn -main
  []
  (set-meeting-time 16 45)
  (time-formatter @meeting-time)
  (start-ride @meeting-time "Jens" 45)
  (pick-up-rider (start-ride @meeting-time "Marvin" 70) "Simon" 20))
```