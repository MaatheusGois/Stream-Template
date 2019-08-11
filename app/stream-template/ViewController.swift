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
    let videoURL = URL(string: "https://br-stream-app.herokuapp.com/video/video.mp4")
    let audioURL = URL(string: "https://br-stream-app.herokuapp.com/audio/music.mp3")
    var videoPlayer:AVPlayer?
    var audioPlayer:AVPlayer?
    
    @IBAction func see(_ sender: Any) {
        performSegue(withIdentifier: "play", sender: videoPlayer)
    }
    @IBAction func listen(_ sender: Any) {
        performSegue(withIdentifier: "listen", sender: audioPlayer)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.videoPlayer = AVPlayer(url: videoURL!)
        self.audioPlayer = AVPlayer(url: audioURL!)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let player = sender as? AVPlayer
        if segue.identifier != nil {
            (segue.destination as! AVPlayerViewController).player = player
        }
    }
}

