//
//  ViewController.swift
//  stream-template
//
//  Created by Matheus Gois on 10/08/19.
//  Copyright © 2019 Matheus Gois. All rights reserved.
// TUTO:https://medium.com/free-code-camp/how-to-set-up-video-streaming-in-your-app-with-avplayer-7dc21bb82f3

import UIKit
import AVKit
import AVFoundation

class ViewController: UIViewController {
    let videoURL = URL(string: "https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4")
    var player:AVPlayer!
    
    @IBAction func see(_ sender: Any) {
        performSegue(withIdentifier: "play", sender: player)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.player = AVPlayer(url: videoURL!)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let player = sender as? AVPlayer
        if segue.identifier != nil {
            if segue.identifier! == "play" {
                (segue.destination as! AVPlayerViewController).player = player
            }
        }
    }
}

